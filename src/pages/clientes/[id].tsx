import { PrismaClient, Cliente } from "@prisma/client";
import { useState } from "react";
import Layout from "components/Layout";
import ClienteItem from "components/Cliente";

const prisma = new PrismaClient();

export default function ID({ data }) {
  const [clientes, setClientes] = useState<Cliente[]>(data);
  console.log("clientes1:",data)
  return (
    <Layout>
      <div className="container mx-auto px-6 py-6">
        <h3 className="text-gray-700 text-2xl font-medium font-serif">
          Nossos clientes
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {clientes.map((c, i) => (
            <ClienteItem key={i} cliente={c} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const clientes: Cliente[] = await prisma.cliente.findMany();
  console.log("clientes2:",clientes)
  return {
    props: {
      data: clientes,
    },
  };
}

export async function getStaticPaths() {
  const clientes: Cliente[] = await prisma.cliente.findMany();
  console.log("clientes3:",clientes)
  return {
    paths: clientes.map((cliente) => ({
      params: {
        id: cliente.id.toString(),
      },
    })),
    fallback: false,
  };
}
