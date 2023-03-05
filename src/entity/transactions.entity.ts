import { Entity, PrimaryGeneratedColumn, Column , ManyToOne} from "typeorm"
import {Account} from './account.entity'
import {Events} from './events.entity'

@Entity()

export class Transactions {

    @PrimaryGeneratedColumn()
    id: number

    @Column("decimal") 
    amount: number  

    @ManyToOne(type => Account, account => account.id) account: Account;

    @ManyToOne(type => Events, events => events.id) events: Events;

    @Column({ nullable: true })
    reversed: Boolean

    @Column()
    createAt: Date
}
