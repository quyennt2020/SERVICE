-- Bảng 1: users
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 2: customers
CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "tax_id" VARCHAR(100),
    "tier" VARCHAR(50),
    "status" VARCHAR(50),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 3: customer_contacts
CREATE TABLE "customer_contacts" (
    "id" SERIAL PRIMARY KEY,
    "customer_id" INTEGER NOT NULL REFERENCES "customers"("id"),
    "full_name" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "role" VARCHAR(100),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 4: equipment_models
CREATE TABLE "equipment_models" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "model_number" VARCHAR(100) UNIQUE,
    "manufacturer" VARCHAR(100),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 5: equipment
CREATE TABLE "equipment" (
    "id" SERIAL PRIMARY KEY,
    "customer_id" INTEGER NOT NULL REFERENCES "customers"("id"),
    "model_id" INTEGER NOT NULL REFERENCES "equipment_models"("id"),
    "serial_number" VARCHAR(100) UNIQUE,
    "location" TEXT,
    "install_date" DATE,
    "status" VARCHAR(50),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 6: contracts
CREATE TABLE "contracts" (
    "id" SERIAL PRIMARY KEY,
    "customer_id" INTEGER NOT NULL REFERENCES "customers"("id"),
    "title" VARCHAR(255),
    "start_date" DATE,
    "end_date" DATE,
    "status" VARCHAR(50),
    "terms" TEXT
);

-- Bảng 7: contract_equipment
CREATE TABLE "contract_equipment" (
    "id" SERIAL PRIMARY KEY,
    "contract_id" INTEGER NOT NULL REFERENCES "contracts"("id"),
    "equipment_id" INTEGER NOT NULL REFERENCES "equipment"("id")
);

-- Bảng 8: tickets
CREATE TABLE "tickets" (
    "id" SERIAL PRIMARY KEY,
    "ticket_ref" VARCHAR(50) UNIQUE,
    "customer_id" INTEGER NOT NULL REFERENCES "customers"("id"),
    "equipment_id" INTEGER NOT NULL REFERENCES "equipment"("id"),
    "assigned_to_id" INTEGER REFERENCES "users"("id"),
    "created_by_id" INTEGER REFERENCES "customer_contacts"("id"),
    "status" VARCHAR(50) NOT NULL,
    "priority" VARCHAR(50),
    "issue_description" TEXT,
    "resolution_notes" TEXT,
    "scheduled_date" TIMESTAMP WITH TIME ZONE,
    "completed_at" TIMESTAMP WITH TIME ZONE,
    "labor_hours" DECIMAL(5, 2),
    "quote_amount" DECIMAL(12, 2),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 9: job_notes
CREATE TABLE "job_notes" (
    "id" SERIAL PRIMARY KEY,
    "ticket_id" INTEGER NOT NULL REFERENCES "tickets"("id"),
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "note" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 10: job_attachments
CREATE TABLE "job_attachments" (
    "id" SERIAL PRIMARY KEY,
    "ticket_id" INTEGER NOT NULL REFERENCES "tickets"("id"),
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "file_url" VARCHAR(512) NOT NULL,
    "attachment_type" VARCHAR(50),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 11: parts
CREATE TABLE "parts" (
    "id" SERIAL PRIMARY KEY,
    "part_number" VARCHAR(100) UNIQUE NOT NULL,
    "description" TEXT,
    "stock" INTEGER DEFAULT 0,
    "min_stock" INTEGER DEFAULT 5,
    "cost" DECIMAL(10, 2),
    "price" DECIMAL(10, 2),
    "location" VARCHAR(100),
    "status" VARCHAR(50)
);

-- Bảng 12: equipment_model_parts
CREATE TABLE "equipment_model_parts" (
    "id" SERIAL PRIMARY KEY,
    "model_id" INTEGER NOT NULL REFERENCES "equipment_models"("id"),
    "part_id" INTEGER NOT NULL REFERENCES "parts"("id"),
    UNIQUE ("model_id", "part_id")
);

-- Bảng 13: inventory_logs
CREATE TABLE "inventory_logs" (
    "id" SERIAL PRIMARY KEY,
    "part_id" INTEGER NOT NULL REFERENCES "parts"("id"),
    "user_id" INTEGER REFERENCES "users"("id"),
    "ticket_id" INTEGER REFERENCES "tickets"("id"),
    "change" INTEGER NOT NULL,
    "reason" VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 14: parts_used
CREATE TABLE "parts_used" (
    "id" SERIAL PRIMARY KEY,
    "ticket_id" INTEGER NOT NULL REFERENCES "tickets"("id"),
    "part_id" INTEGER NOT NULL REFERENCES "parts"("id"),
    "quantity" INTEGER DEFAULT 1,
    "cost_at_time" DECIMAL(10, 2),
    "price_at_time" DECIMAL(10, 2)
);

-- Bảng 15: invoices
CREATE TABLE "invoices" (
    "id" SERIAL PRIMARY KEY,
    "invoice_ref" VARCHAR(50) UNIQUE,
    "customer_id" INTEGER NOT NULL REFERENCES "customers"("id"),
    "ticket_id" INTEGER UNIQUE NOT NULL REFERENCES "tickets"("id"),
    "status" VARCHAR(50) NOT NULL,
    "issue_date" DATE,
    "due_date" DATE,
    "sub_total" DECIMAL(12, 2),
    "tax" DECIMAL(12, 2),
    "total" DECIMAL(12, 2),
    "paid_at" TIMESTAMP WITH TIME ZONE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 16: invoice_line_items
CREATE TABLE "invoice_line_items" (
    "id" SERIAL PRIMARY KEY,
    "invoice_id" INTEGER NOT NULL REFERENCES "invoices"("id"),
    "description" TEXT,
    "quantity" DECIMAL(5, 2),
    "unit_price" DECIMAL(10, 2),
    "line_total" DECIMAL(12, 2)
);

-- Bảng 17: kb_articles
CREATE TABLE "kb_articles" (
    "id" SERIAL PRIMARY KEY,
    "author_id" INTEGER REFERENCES "users"("id"),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "category" VARCHAR(100),
    "tags" TEXT[],
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 18: notifications
CREATE TABLE "notifications" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "title" VARCHAR(255),
    "message" TEXT,
    "category" VARCHAR(50),
    "is_read" BOOLEAN DEFAULT false,
    "action_payload" JSONB,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 19: system_settings
CREATE TABLE "system_settings" (
    "id" INTEGER PRIMARY KEY DEFAULT 1,
    "company_name" VARCHAR(255),
    "company_address" TEXT,
    "company_tax_id" VARCHAR(100),
    "company_logo_url" VARCHAR(512)
);
