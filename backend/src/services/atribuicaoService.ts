import { supabase } from '../config/supabase.js';
import type { Atribuido } from '../types/index.js';
import { verificarCargaHoraria } from './cargaHorariaService.js';

export async function atribuirProfessor(dados: Atribuido) {
  // Conflito de Sala
  const { data: salaOcupada } = await supabase
    .from('ATRIBUIDO')
    .select('*')
    .eq('ID_Sala', dados.ID_Sala)
    .eq('ID_Horario', dados.ID_Horario)
    .maybeSingle();

  if (salaOcupada) throw new Error('Esta sala já possui uma aula atribuída neste horário.');

  // Conflito de Professor
  const { data: profOcupado } = await supabase
    .from('ATRIBUIDO')
    .select('*')
    .eq('ID_Docente', dados.ID_Docente)
    .eq('ID_Horario', dados.ID_Horario)
    .maybeSingle();

  if (profOcupado) throw new Error('Este professor já está alocado em outra sala neste horário.');

  // Carga Horária
  await verificarCargaHoraria(dados.ID_Docente, dados.ch_semanal);

  const { error } = await supabase
    .from('ATRIBUIDO')
    .insert([dados]);

  if (error) throw new Error('Erro ao salvar: ' + error.message);

  return { success: true };
}