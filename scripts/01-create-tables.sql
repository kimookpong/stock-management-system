-- Create database tables for pharmacy stock system

-- SKU Groups table
CREATE TABLE IF NOT EXISTS sku_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warehouses table
CREATE TABLE IF NOT EXISTS warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SKUs table
CREATE TABLE IF NOT EXISTS skus (
    id SERIAL PRIMARY KEY,
    sku_code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    group_id INTEGER REFERENCES sku_groups(id),
    unit VARCHAR(50) DEFAULT 'piece',
    min_stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 1000,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock table
CREATE TABLE IF NOT EXISTS stock (
    id SERIAL PRIMARY KEY,
    sku_id INTEGER REFERENCES skus(id),
    warehouse_id INTEGER REFERENCES warehouses(id),
    quantity INTEGER DEFAULT 0,
    reserved_quantity INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sku_id, warehouse_id)
);

-- Stock movements table
CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    sku_id INTEGER REFERENCES skus(id),
    warehouse_id INTEGER REFERENCES warehouses(id),
    movement_type VARCHAR(20) CHECK (movement_type IN ('receive', 'issue', 'transfer_in', 'transfer_out', 'adjust')),
    quantity INTEGER NOT NULL,
    reference_number VARCHAR(100),
    notes TEXT,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stock_sku_warehouse ON stock(sku_id, warehouse_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_sku ON stock_movements(sku_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_warehouse ON stock_movements(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created_at ON stock_movements(created_at);
