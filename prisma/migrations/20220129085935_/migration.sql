-- CreateTable
CREATE TABLE "User" (
    "ID_USUARIO" SERIAL NOT NULL,
    "NOME" TEXT NOT NULL,
    "EMAIL" TEXT NOT NULL,
    "SENHA" TEXT NOT NULL,
    "ADMINISTRADOR" BOOLEAN NOT NULL DEFAULT false,
    "ATIVO" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID_USUARIO")
);

-- CreateTable
CREATE TABLE "Product" (
    "ID_PRODUTO" INTEGER NOT NULL,
    "NOME" TEXT NOT NULL,
    "DESCRICAO" TEXT NOT NULL,
    "COLECAO" TEXT NOT NULL,
    "GRIFFE" TEXT NOT NULL,
    "ESTOQUE" BOOLEAN NOT NULL,
    "ATIVO" BOOLEAN NOT NULL DEFAULT true,
    "PRECO" DOUBLE PRECISION NOT NULL,
    "DESCONTO" INTEGER NOT NULL,
    "PRECO_FINAL" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Log" (
    "LOG_ID" SERIAL NOT NULL,
    "ID_USUARIO" INTEGER NOT NULL,
    "ID_PRODUTO" TEXT NOT NULL,
    "CAMPO_ALTERADO" TEXT NOT NULL,
    "VALOR_ORIGINAL" DOUBLE PRECISION NOT NULL,
    "VALOR_NOVO" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("LOG_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_EMAIL_key" ON "User"("EMAIL");

-- CreateIndex
CREATE UNIQUE INDEX "Product_ID_PRODUTO_key" ON "Product"("ID_PRODUTO");
