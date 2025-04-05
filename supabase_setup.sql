-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0
);

-- Create customers table (linked to auth.users)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_customer_id TEXT,
  name TEXT,
  email TEXT
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  stripe_checkout_id TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase NUMERIC(10, 2) NOT NULL
);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, stock)
VALUES
  ('Ethiopian Yirgacheffe', 'A light roast coffee with bright acidity, floral notes, and a clean finish.', 14.99, '/products/ethiopian.svg', 'Light Roast', 100),
  ('Colombian Supremo', 'A medium roast with rich chocolate notes and a nutty finish.', 12.99, '/products/colombian.svg', 'Medium Roast', 150),
  ('Espresso Blend', 'A dark roast blend specifically formulated for espresso with notes of chocolate and caramel.', 15.99, '/products/espresso.svg', 'Dark Roast', 100),
  ('Organic Decaf', 'Swiss Water Process decaffeinated coffee with notes of chocolate and nuts.', 16.99, '/products/decaf.svg', 'Decaf', 75);

-- Create RLS policies
-- Enable RLS on the tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products - anyone can view, only authenticated users with specific role can edit
CREATE POLICY "Anyone can view products" 
  ON products FOR SELECT 
  USING (true);

-- Customers - users can view and edit their own customer data
CREATE POLICY "Users can view their own customer data" 
  ON customers FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own customer data" 
  ON customers FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own customer data" 
  ON customers FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Orders - users can only view and manage their own orders
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
  ON orders FOR UPDATE 
  USING (auth.uid() = user_id);

-- Order items - users can only view and manage their own order items
CREATE POLICY "Users can view their own order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own order items" 
  ON order_items FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )); 