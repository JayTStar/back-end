-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_idCargo_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_idCategoria_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "idCargo" DROP NOT NULL,
ALTER COLUMN "idCategoria" DROP NOT NULL,
ALTER COLUMN "telefone" DROP NOT NULL,
ALTER COLUMN "aniversario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
