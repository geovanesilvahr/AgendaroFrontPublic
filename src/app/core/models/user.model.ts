export interface User {
    id: number;              // ID do usuário (pode ser um número ou string, dependendo do backend)
    username: string;        // Nome de usuário
    email: string;           // Email do usuário
    fullName: string;        // Nome completo do usuário
    role: string;            // Papel do usuário (admin, usuário comum, etc)
    token: string;           // Token de autenticação (se estiver utilizando JWT, por exemplo)
    createdAt: string;       // Data de criação
    updatedAt: string;       // Data da última atualização
  }
  