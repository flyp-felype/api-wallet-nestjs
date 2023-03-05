import { Injectable, Inject } from "@nestjs/common"; 
import { Events } from '../entity/events.entity' 
import { Repository } from "typeorm"; 
 
@Injectable()
export class EventsServices {
    constructor(
        @Inject('EVENTS_REPOSITORY')
        private readonly eventsRepository: Repository<Events>,
    ) {
    }

    async set(name: string, type: string) {
        //buscar conta
        const events = new Events()

        events.name = name;
        events.type = type;
        events.createAt = new Date()

        await this.eventsRepository.save(events)
    }

}