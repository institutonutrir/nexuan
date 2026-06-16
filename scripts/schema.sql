-- ============================================
-- SCHEMA NEXUAN - BANCO DE DADOS
-- ============================================

-- 1. TABELAS DE AUTENTICAÇÃO E USUÁRIOS
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  profession VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  contact_name VARCHAR(255),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  zip_code VARCHAR(10),
  rt_name VARCHAR(255),
  rt_registration VARCHAR(100),
  operation_hours TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 1: ENGENHARIA DE CARDÁPIOS
-- ============================================

CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(50),
  correction_factor DECIMAL(5,3),
  cost_per_unit DECIMAL(10,2),
  supplier VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  portion_size DECIMAL(10,2),
  portion_unit VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  gross_weight DECIMAL(10,2),
  net_weight DECIMAL(10,2),
  cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  selling_price DECIMAL(10,2),
  quantity_sold INTEGER DEFAULT 0,
  month VARCHAR(7),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 2: AUDITORIA RDC 216
-- ============================================

CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  audit_date DATE NOT NULL,
  total_items INTEGER DEFAULT 0,
  conforming_items INTEGER DEFAULT 0,
  non_conforming_items INTEGER DEFAULT 0,
  na_items INTEGER DEFAULT 0,
  compliance_percentage DECIMAL(5,2),
  status VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  order_index INTEGER
);

INSERT INTO audit_categories (name, description, order_index) VALUES
('Instalações e Dependências', 'Estrutura física, limpeza, layout', 1),
('Equipamentos e Utensílios', 'Conservação, higiene, capacidade', 2),
('Controle de Pragas', 'Evidências, monitoramento, registros', 3),
('Água e Esgoto', 'Qualidade, armazenamento, descarte', 4),
('Resíduos', 'Acondicionamento, coleta, higiene', 5),
('Manipuladores', 'Higiene, saúde, treinamento', 6),
('Matérias-Primas', 'Seleção, armazenamento, controle', 7),
('Preparação de Alimentos', 'Fluxo, temperaturas, contaminação cruzada', 8),
('Documentação', 'Registros, POPs, rastreabilidade', 9);

CREATE TABLE audit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES audit_categories(id),
  item_text TEXT NOT NULL,
  order_index INTEGER
);

CREATE TABLE audit_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES audit_items(id),
  response VARCHAR(10),
  observation TEXT,
  photo_url TEXT,
  action_plan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 3: DOCUMENTOS REGULATÓRIOS
-- ============================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  file_url TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appcc_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  process_step VARCHAR(255),
  dangers TEXT,
  preventive_measures TEXT,
  critical_limits TEXT,
  monitoring TEXT,
  corrective_actions TEXT,
  records TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 4: GESTÃO DE RH E PRODUTIVIDADE
-- ============================================

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  start_date DATE,
  workload_hours DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE productivity_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meals_served INTEGER,
  team_count INTEGER,
  ipi DECIMAL(10,2),
  ipf DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE task_distribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  task_name VARCHAR(255),
  percentage DECIMAL(5,2),
  team_member_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 5: ROTULAGEM NUTRICIONAL
-- ============================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  portion_size DECIMAL(10,2),
  portion_unit VARCHAR(50),
  servings_per_package INTEGER,
  ingredients_list TEXT,
  allergens TEXT,
  requires_front_label_warning BOOLEAN DEFAULT FALSE,
  warning_reasons TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nutritional_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  energy_100 DECIMAL(10,2),
  carbs_100 DECIMAL(10,2),
  total_sugars_100 DECIMAL(10,2),
  added_sugars_100 DECIMAL(10,2),
  protein_100 DECIMAL(10,2),
  total_fat_100 DECIMAL(10,2),
  saturated_fat_100 DECIMAL(10,2),
  trans_fat_100 DECIMAL(10,2),
  fiber_100 DECIMAL(10,2),
  sodium_100 DECIMAL(10,2),

  energy_portion DECIMAL(10,2),
  carbs_portion DECIMAL(10,2),
  total_sugars_portion DECIMAL(10,2),
  added_sugars_portion DECIMAL(10,2),
  protein_portion DECIMAL(10,2),
  total_fat_portion DECIMAL(10,2),
  saturated_fat_portion DECIMAL(10,2),
  trans_fat_portion DECIMAL(10,2),
  fiber_portion DECIMAL(10,2),
  sodium_portion DECIMAL(10,2),

  vdr_energy DECIMAL(5,2),
  vdr_carbs DECIMAL(5,2),
  vdr_protein DECIMAL(5,2),
  vdr_total_fat DECIMAL(5,2),
  vdr_saturated_fat DECIMAL(5,2),
  vdr_fiber DECIMAL(5,2),
  vdr_sodium DECIMAL(5,2),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE front_label_warnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  warning_type VARCHAR(50),
  threshold_solid DECIMAL(10,2),
  threshold_liquid DECIMAL(10,2),
  actual_value DECIMAL(10,2),
  exceeds_threshold BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MÓDULO 6: ESTOQUE E TABULAÇÃO FINANCEIRA
-- ============================================

CREATE TABLE products_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  current_stock DECIMAL(10,2),
  min_stock DECIMAL(10,2),
  max_stock DECIMAL(10,2),
  reorder_point DECIMAL(10,2),
  avg_daily_consumption DECIMAL(10,2),
  delivery_days INTEGER,
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE,
  supplier VARCHAR(255),
  invoice_date DATE,
  total_amount DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  description VARCHAR(255),
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total_price DECIMAL(12,2),
  received_date DATE
);

CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  movement_type VARCHAR(50),
  quantity DECIMAL(10,2),
  reason TEXT,
  movement_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_ingredients_client_id ON ingredients(client_id);
CREATE INDEX idx_recipes_client_id ON recipes(client_id);
CREATE INDEX idx_audits_client_id ON audits(client_id);
CREATE INDEX idx_audits_user_id ON audits(user_id);
CREATE INDEX idx_products_client_id ON products(client_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_team_members_client_id ON team_members(client_id);

-- ============================================
-- FIM DO SCHEMA
-- ============================================
