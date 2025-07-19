import { prisma } from '@/lib/prisma'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'


// Função que gera uma URL de banco de dados baseada em um schema único
function generateDatabaseURL(schema: string) {
  // Garante que a variável DATABASE_URL esteja definida
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  // Cria um objeto URL a partir da variável DATABASE_URL
  const url = new URL(process.env.DATABASE_URL)
  // Altera o parâmetro "schema" da URL para o schema informado
  url.searchParams.set('schema', schema)

  // Retorna a URL completa com o novo schema
  return url.toString()
}

// Exporta o ambiente customizado para o Vitest
export default <Environment>{
  // Nome do ambiente
  name: 'prisma',
  // Modo de transformação (server-side rendering)
  transformMode: 'ssr',

  // Função executada antes de cada teste
  async setup() {
    // Gera um schema aleatório (ex: "e2348f52-d839-4c9a-bce9-...")
    const schema = randomUUID()

    // Gera uma nova URL de banco de dados com esse schema
    const databaseURL = generateDatabaseURL(schema)

    // Define a URL gerada como a nova DATABASE_URL para o processo atual
    process.env.DATABASE_URL = databaseURL

    // Executa as migrações do Prisma nesse novo schema
    execSync('npx prisma migrate deploy')

    // Retorna um objeto com o método teardown, que será chamado após os testes
    return {
      async teardown() {
        // Remove o schema criado para testes (com CASCADE para apagar tudo relacionado)
        await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        // Desconecta do banco de dados
        await prisma.$disconnect()
      }
    }
  }
}
