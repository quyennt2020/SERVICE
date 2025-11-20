import axios from 'axios';

describe('Repair Workflow E2E', () => {
    let adminToken: string;
    let techId: number;
    let customerId: number;
    let equipmentId: number;
    let ticketId: number;
    let modelId: number;

    const timestamp = Date.now();
    const adminEmail = 'admin@medequip.com';
    const adminPassword = 'password';

    const newTech = {
        email: `tech_${timestamp}@example.com`,
        password: 'password123',
        full_name: `Tech ${timestamp}`,
        role: 'TECHNICIAN',
    };

    const newCustomer = {
        name: `Customer ${timestamp}`,
        email: `customer_${timestamp}@example.com`,
        phone: '555-0100',
        address: '123 Test St',
    };

    const newModel = {
        name: `Model ${timestamp}`,
        model_number: `M-${timestamp}`,
        manufacturer: 'TestCorp',
    };

    const newEquipment = {
        serial_number: `SN-${timestamp}`,
        status: 'Operational',
    };

    const newTicket = {
        issue_description: 'Device making strange noises',
        priority: 'High',
        status: 'Open',
    };

    it('should login as admin', async () => {
        const res = await axios.post('/api/auth/login', {
            email: adminEmail,
            password: adminPassword,
        });
        expect(res.status).toBe(201);
        expect(res.data.access_token).toBeDefined();
        adminToken = res.data.access_token;
    });

    const authHeaders = () => ({
        headers: { Authorization: `Bearer ${adminToken}` },
    });

    it('should create a new technician', async () => {
        const res = await axios.post('/api/users', newTech, authHeaders());
        expect(res.status).toBe(201);
        expect(res.data.id).toBeDefined();
        expect(res.data.email).toBe(newTech.email);
        techId = res.data.id;
    });

    it('should create a customer', async () => {
        const res = await axios.post('/api/customers', newCustomer, authHeaders());
        expect(res.status).toBe(201);
        expect(res.data.id).toBeDefined();
        customerId = res.data.id;
    });

    it('should create an equipment model', async () => {
        const res = await axios.post('/api/equipment/models', newModel, authHeaders());
        expect(res.status).toBe(201);
        expect(res.data.id).toBeDefined();
        modelId = res.data.id;
    });

    it('should create equipment for the customer', async () => {
        const res = await axios.post('/api/equipment', {
            ...newEquipment,
            customer_id: customerId,
            model_id: modelId,
        }, authHeaders());
        expect(res.status).toBe(201);
        expect(res.data.id).toBeDefined();
        equipmentId = res.data.id;
    });

    it('should create a ticket', async () => {
        const res = await axios.post('/api/tickets', {
            ...newTicket,
            customer_id: customerId,
            equipment_id: equipmentId,
        }, authHeaders());
        expect(res.status).toBe(201);
        expect(res.data.id).toBeDefined();
        expect(res.data.ticket_ref).toBeDefined();
        ticketId = res.data.id;
    });

    it('should assign the ticket to the technician', async () => {
        const res = await axios.patch(`/api/tickets/${ticketId}/assign`, {
            techId: techId,
        }, authHeaders());
        expect(res.status).toBe(200);
        expect(res.data.assigned_tech_id).toBe(techId);
    });

    it('should verify the ticket is assigned', async () => {
        const res = await axios.get(`/api/tickets/${ticketId}`, authHeaders());
        expect(res.status).toBe(200);
        expect(res.data.assigned_tech.id).toBe(techId);
    });
});
