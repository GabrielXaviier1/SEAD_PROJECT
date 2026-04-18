import { supabase } from '../config/supabase.js';

export async function verificarCargaHoraria(idDocente: number, novaCH: number) {
  const { data: atribuicoes } = await supabase
    .from('ATRIBUIDO')
    .select('ch_semanal')
    .eq('ID_Docente', idDocente);

  const cargaAtual = atribuicoes?.reduce((total, item) => total + item.ch_semanal, 0) || 0;

  const { data: docente } = await supabase
    .from('DOCENTE')
    .select('Carga_Horaria')
    .eq('ID_Docente', idDocente)
    .single();

  if (!docente) throw new Error('Docente não encontrado.');

  if (cargaAtual + novaCH > docente.Carga_Horaria) {
    throw new Error(`Limite excedido! O prof tem ${cargaAtual}h e você tenta add mais ${novaCH}h (Máx: ${docente.Carga_Horaria}h).`);
  }
}