import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
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
  document_type: string;
  
  @Column()
  document_number: string;

  @Column()
  birthdate: Date;
  
  @Column()
  rol: Role;
  
  @Column()
  status: Status;
  
  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updated_at: Date;
}
