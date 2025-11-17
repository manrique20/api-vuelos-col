import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  surname: string;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  cellphone: string;
  
  @Column()
  documentType: string;
  
  @Column()
  documentNumber: string;
  
  @Column()
  role: Role;
  
  @Column()
  status: Status;
  
  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
