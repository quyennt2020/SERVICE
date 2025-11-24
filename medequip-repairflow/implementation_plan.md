# Implementation Plan - Technician Assignment

# Goal Description
Enable the assignment of Tickets to specific Technicians. This allows for better workflow management and gives technicians a focused view of their work.

## Proposed Changes

### Backend

#### [MODIFY] [ticket.entity.ts](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/backend/src/app/entities/ticket.entity.ts)
- Add `assigned_tech` relation (ManyToOne to User).
- Add `assigned_tech_id` column.

#### [MODIFY] [tickets.service.ts](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/backend/src/app/tickets/tickets.service.ts)
- Update `create` and `update` to handle `assigned_tech_id`.
- Add `assignTicket(ticketId, techId)` method.
- Update `findAll` to support filtering by `assigned_tech_id`.

#### [MODIFY] [tickets.controller.ts](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/backend/src/app/tickets/tickets.controller.ts)
- Add `PATCH /tickets/:id/assign` endpoint.
- Update `GET /tickets` to accept `techId` query param.

### Frontend

#### [MODIFY] [api.ts](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/frontend-admin/src/app/api.ts)
- Add `assignTicket(ticketId, techId)` function.

#### [MODIFY] [TicketDetailPage.tsx](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/frontend-admin/src/app/pages/TicketDetailPage.tsx)
- Add "Assign Technician" section/dropdown in the sidebar or header.
- Only visible to Admins/Managers.
- Lists users with role 'TECHNICIAN'.

#### [MODIFY] [DashboardPage.tsx](file:///c:/Users/TPump/Desktop/SERVICE/SERVICE/medequip-repairflow/packages/frontend-admin/src/app/pages/DashboardPage.tsx)
- If logged in as Technician, default to showing "My Tickets" (tickets assigned to them).
- Add a toggle/filter for "All Tickets" vs "My Tickets" (for Admins).

## Verification Plan

### Manual Verification
- Log in as Admin.
- Open a Ticket.
- Assign it to a Technician (e.g., the one created in the previous step).
- Log out and log in as that Technician.
- Verify the ticket appears in their "My Tickets" view.
