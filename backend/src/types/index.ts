export interface Docente {
  ID_Docente: number;
  Nome_Docente: string;
  Email_Docente: string;
  Senha_Docente: string;
  Nivel_Acesso: 'DIREÇÃO' |'COORDENADOR' | 'PROFESSOR';
  Carga_Horaria: number;
}

export interface Atribuido {
  ID_Docente: number;
  ID_Disc: string;
  ID_Sala: number;
  ID_Horario: number;
  ch_semanal: number;
}