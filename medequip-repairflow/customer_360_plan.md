# Implementation Plan - Customer 360° Detail View

## Goal
Create a comprehensive customer detail modal that shows all customer information in one place with multiple tabs.

## Components to Create/Modify

### 1. Backend API Endpoints (NEW)
- `GET /customers/:id/tickets` - Get all tickets for a customer
- `GET /customers/:id/equipment` - Get all equipment for a customer  
- `GET /customers/:id/invoices` - Get all invoices for a customer (placeholder for now)
- `GET /customers/:id/stats` - Get customer statistics (ticket count, revenue, etc.)

### 2. Frontend Components (NEW)
- `CustomerDetailModal.tsx` - Main modal with tabs
  - Overview Tab - Customer info, KPIs
  - Equipment Tab - List of customer's equipment
  - Service History Tab - List of tickets/jobs
  - Billing Tab - List of invoices (placeholder)
  - Contacts Tab - Customer contacts (future)

### 3. Frontend Pages (MODIFY)
- `CustomerListPage.tsx` - Add "View Details" button to open modal

## Implementation Steps

### Phase 1: Backend APIs
1. Add methods to CustomersService:
   - `getCustomerTickets(customerId)`
   - `getCustomerEquipment(customerId)`
   - `getCustomerStats(customerId)`
2. Add endpoints to CustomersController

### Phase 2: Frontend Modal
1. Create `CustomerDetailModal.tsx` with tab structure
2. Create tab components:
   - `CustomerOverviewTab.tsx`
   - `CustomerEquipmentTab.tsx`
   - `CustomerServiceHistoryTab.tsx`
   - `CustomerBillingTab.tsx`
3. Add API functions to `api.ts`

### Phase 3: Integration
1. Update `CustomerListPage.tsx` to open detail modal
2. Style and polish the UI

## Success Criteria
- ✅ Click customer name/row opens detail modal
- ✅ Modal shows customer info and KPIs
- ✅ Equipment tab shows all customer equipment
- ✅ Service History tab shows all tickets
- ✅ Billing tab shows placeholder for invoices
- ✅ Modal is responsive and looks professional
