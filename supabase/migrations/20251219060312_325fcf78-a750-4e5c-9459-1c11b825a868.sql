-- Create enum for traffic status
CREATE TYPE public.traffic_status AS ENUM ('clear', 'moderate', 'congested');

-- Create enum for alert types
CREATE TYPE public.alert_type AS ENUM ('incident', 'roadwork', 'event', 'info');

-- Create enum for alert status
CREATE TYPE public.alert_status AS ENUM ('active', 'resolved');

-- Create enum for operator status
CREATE TYPE public.operator_status AS ENUM ('active', 'inactive', 'suspended');

-- Routes table - stores public transport routes
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  fare DECIMAL(10,2),
  status traffic_status NOT NULL DEFAULT 'clear',
  avg_time INTEGER, -- in minutes
  distance DECIMAL(10,2), -- in km
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Traffic reports table - stores real-time traffic data
CREATE TABLE public.traffic_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
  status traffic_status NOT NULL,
  avg_time INTEGER, -- in minutes
  change_percent DECIMAL(5,2), -- percentage change from normal
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Traffic alerts table - stores traffic incidents and alerts
CREATE TABLE public.traffic_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type alert_type NOT NULL DEFAULT 'info',
  status alert_status NOT NULL DEFAULT 'active',
  location TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Operators table - stores transport operator information
CREATE TABLE public.operators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  license_number TEXT,
  phone TEXT,
  email TEXT,
  status operator_status NOT NULL DEFAULT 'active',
  vehicles_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User reports table - stores user-submitted traffic reports
CREATE TABLE public.user_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL, -- 'congestion', 'accident', 'roadwork', etc.
  description TEXT,
  location TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Routes policies (public read, authenticated write)
CREATE POLICY "Routes are viewable by everyone" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert routes" ON public.routes FOR INSERT TO authenticated WITH CHECK (true);

-- Traffic reports policies (public read)
CREATE POLICY "Traffic reports are viewable by everyone" ON public.traffic_reports FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert traffic reports" ON public.traffic_reports FOR INSERT TO authenticated WITH CHECK (true);

-- Traffic alerts policies (public read, authenticated create)
CREATE POLICY "Traffic alerts are viewable by everyone" ON public.traffic_alerts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create alerts" ON public.traffic_alerts FOR INSERT TO authenticated WITH CHECK (auth.uid() = reported_by);
CREATE POLICY "Users can update their own alerts" ON public.traffic_alerts FOR UPDATE TO authenticated USING (auth.uid() = reported_by);

-- Operators policies
CREATE POLICY "Operators are viewable by everyone" ON public.operators FOR SELECT USING (true);
CREATE POLICY "Users can manage their own operator profile" ON public.operators FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- User reports policies
CREATE POLICY "User reports are viewable by everyone" ON public.user_reports FOR SELECT USING (true);
CREATE POLICY "Users can create their own reports" ON public.user_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reports" ON public.user_reports FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own profile" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON public.routes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_traffic_alerts_updated_at BEFORE UPDATE ON public.traffic_alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON public.operators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for traffic data
ALTER PUBLICATION supabase_realtime ADD TABLE public.traffic_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.traffic_alerts;