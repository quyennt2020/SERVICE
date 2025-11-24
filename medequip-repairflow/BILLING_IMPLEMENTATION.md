# Billing Module Implementation Plan

## Objective
Implement the Billing Module to manage invoices, track payments, and integrate with the Customer 360° view.

## Phases

### Phase 1: Backend Implementation
- [x] Create `InvoicesModule`
- [x] Create `InvoicesService`
- [x] Create `InvoicesController`
# Billing Module Implementation Plan

## Objective
Implement the Billing Module to manage invoices, track payments, and integrate with the Customer 360° view.

## Phases

### Phase 1: Backend Implementation
- [x] Create `InvoicesModule`
- [x] Create `InvoicesService`
- [x] Create `InvoicesController`
- [x] Register `InvoicesModule` in `AppModule`

### Phase 2: Frontend Integration (Customer 360)
- [x] Add `fetchCustomerInvoices` to `api.ts`
- [x] Update `CustomerDetailModal` "Billing" tab

### Phase 3: Invoice Management UI
- [x] **Create Invoices Page**
  - [x] Create `InvoicesPage.tsx` to list all invoices.
  - [x] Add route `/invoices` in `App.tsx`.
  - [x] Add "Invoices" link to Sidebar.
- [x] **Implement Invoice Detail View**
  - [x] Create `InvoiceDetailModal` to view invoice details (line items, totals).
  - [x] Integrate modal into `InvoicesPage`.
- [x] **Implement "Generate Invoice" Action**
  - [x] Add "Generate Invoice" button to `TicketDetailPage` (visible when ticket is Resolved).
  - [x] Implement API call to create invoice from ticket.

## Current Status
- Phases 1, 2, and 3 are complete.
