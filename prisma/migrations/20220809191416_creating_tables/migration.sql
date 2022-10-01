-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idCargo" INTEGER NOT NULL DEFAULT 1,
    "idCategoria" INTEGER NOT NULL,
    "telefone" INTEGER NOT NULL,
    "aniversario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_matricula_key" ON "Users"("matricula");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
