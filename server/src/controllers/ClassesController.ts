
import { Request, Response } from "express";

import convertHourMinute from "../utils/convertHourMinute";
import db from "../database/connection";


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}


export default class ClassesController {

    async index(request: Request, response: Response) {


        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: "Missing filters to search classes",
            });
        }

        const timeInMinutes = convertHourMinute(time);

        const classes = await db("classes")
      .whereExists(function Exists() {
        this.select("class_schedule.*") // seleciona todos os campos da tabela 'class_schedule'
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`") // pesquisa todos os agendamentos que tem o class_id igual ao buscado
          .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)]) // pesquisa todos os agendamentos que o dia da semana for igual ao buscado
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes]) // pesquisa todos os agendamentos que tem horário menor ou igual ao buscado
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]); // pesquisa todos os agendamentos que que tem horário maior que o buscado
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

        return response.json(classes);
    
    }

    async create(req: Request, res: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const trx = await db.transaction();

        try {
            const isertUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = isertUsersIds[0];


            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedClassesIds[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourMinute(scheduleItem.from),
                    to: convertHourMinute(scheduleItem.to)
                }
            });

            await trx('class_schedule').insert(classSchedule);


            await trx.commit();

            return res.status(201).send();

        } catch (err) {
            return console.log(err);
            await trx.rollback();
            return res.status(400).json({ error: 'Erro nas tabelas' });

        }
    }
}