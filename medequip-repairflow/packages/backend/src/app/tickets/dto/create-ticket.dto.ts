export class CreateTicketDto {
  customer_id: number;
  equipment_id: number;
  status: string;
  priority: string;
  issue_description: string;
}
