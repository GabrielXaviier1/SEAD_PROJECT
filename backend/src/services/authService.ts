import { supabase } from '../config/supabase.js';
import type { Docente } from '../types/index.js';

export async function login(email: string, senha: string): Promise<Docente> {
  const { data, error } = await supabase
    .from('DOCENTE')
    .select('*')
    .eq('Email_Docente', email)
    .eq('Senha_Docente', senha)
    .single();

  if (error || !data) {
    throw new Error('E-mail ou senha incorretos.');
  }

  return data as Docente;
}