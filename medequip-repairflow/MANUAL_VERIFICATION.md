# Manual Verification Checklist - MedEquip RepairFlow

## Current Status
- ✅ Frontend running on http://localhost:4200/
- ✅ Backend running on http://localhost:3000/
- ✅ Already logged in to the application

## Verification Steps

### 1. Dashboard & Navigation
- [ ] Verify "All Tickets" / "My Tickets" toggle is visible
- [ ] Check that the navigation menu works (Dashboard, Customers, Equipment, Settings)
- [ ] Verify "Create New Ticket" button is present

### 2. Customer Management
- [ ] Navigate to Customers page
- [ ] Click "Add Customer" button
- [ ] Fill in customer details:
  - Name: "Test Hospital"
  - Email: "test@hospital.com"
  - Phone: "555-1234"
  - Address: "123 Medical Ave"
- [ ] Save and verify customer appears in list
- [ ] Edit the customer (change phone number)
- [ ] Verify changes are saved

### 3. Equipment Management
- [ ] Navigate to Equipment page
- [ ] Click "Add Equipment" button
- [ ] Fill in equipment details:
  - Select the customer created above
  - Serial Number: "SN-TEST-001"
  - Type/Model: "X-Ray Machine"
  - Status: "Operational"
- [ ] Save and verify equipment appears in list
- [ ] Edit the equipment (change status)
- [ ] Verify changes are saved

### 4. User Management (Technician Creation)
- [ ] Navigate to Settings page
- [ ] Click "Invite User" button
- [ ] Create a technician:
  - Full Name: "John Technician"
  - Email: "john.tech@medequip.com"
  - Role: "TECHNICIAN"
  - Password: "password123"
- [ ] Save and verify user appears in list

### 5. Ticket Creation & Assignment
- [ ] Navigate back to Dashboard
- [ ] Click "Create New Ticket" button
- [ ] Fill in ticket details:
  - Select customer: "Test Hospital"
  - Select equipment: "SN-TEST-001"
  - Issue Description: "Machine making unusual noise during operation"
  - Priority: "High"
  - Status: "Open"
- [ ] Save and verify ticket appears in dashboard
- [ ] Click on the newly created ticket to open details
- [ ] In the "Assign Technician" section:
  - Select "John Technician" from dropdown
  - Click "Assign" button
- [ ] Verify assignment is successful (should show assigned technician)

### 6. Technician View ("My Tickets")
- [ ] On Dashboard, click "My Tickets" toggle
- [ ] If logged in as admin, you should see all tickets
- [ ] **To test technician view properly:**
  - Log out (if logout button exists)
  - Log in as: john.tech@medequip.com / password123
  - Verify "My Tickets" shows only the assigned ticket
  - Verify ticket details are accessible

### 7. Ticket Workflow (Optional - if time permits)
- [ ] Open the assigned ticket
- [ ] Add diagnosis notes
- [ ] Create a quote
- [ ] Mark as completed
- [ ] Generate invoice

## Issues Found
Document any issues discovered during testing:

1. 
2. 
3. 

## Notes
- Admin credentials: admin@medequip.com / password
- Test technician: john.tech@medequip.com / password123
- All data is in the local PostgreSQL database
