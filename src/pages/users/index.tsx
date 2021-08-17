import { useRef } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Slider from "react-slick";
import { ClienteProps } from "components/clientes/Cliente"
import { PrismaClient, Cliente } from "@prisma/client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react"
import Layout from 'src/components/Layout';

const prisma = new PrismaClient();

const ClienteCard = dynamic(
  () => import('components/clientes/ClienteCard'),
  { loading: () => <p>carregando</p> }
)

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 4,
  variableWidth: true,
  initialSlide: 0,
  infinite: false,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    }
  ]
};

export async function getStaticProps() {

  const clientes = await prisma.cliente.findMany();
  //console.log("cli:",clientes);
  return {
    props: { clientes },
  };
};

type Props = {
  clientes: ClienteProps[];
};

const Users: React.FC<Props> = (props) => {
  const ref = useRef(null)

  const handlePrev = () => {
    ref.current.slickPrev()
  }

  const handleNext = () => {
    ref.current.slickNext()
  }
  //console.log("props:",props);

  return (
    <>
      <Layout>
        <div style={{ textAlign: 'center', borderTop: '1px solid grey' }}>
          <Table width="90%" variant="simple" colorScheme="teal">
            <TableCaption>Clientes</TableCaption>
            <Thead>
              <Tr style={{ alignContent: 'center' }}>
                <Th>
                  <h3>id</h3>
                </Th>
                <Th align="left">
                  <h3>Nome</h3>
                </Th>
                <Th align="left">
                  <h3>Telefone</h3>
                </Th>
                <Th>
                  <h3>Email</h3>
                </Th>
                <Th>
                  <h3>Ação</h3>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Slider {...settings} ref={ref}>
                {
                  props.clientes.length ? props.clientes.slice(0, 10).map((item: any, key: number) => (
                    <ClienteCard key={key} item={item} />
                  )) : null
                }
              </Slider>
            </Tbody>
          </Table>
        </div>

        <section className="w-full lg:overflow-hidden py-5 px-4">
          <div>
            <div className="grid grid-flow-col items-center gap-4 justify-end mb-4">
              <span>Vê todos</span>
              <div className="grid grid-flow-col gap-1">
                <button onClick={handlePrev} className="bg-green-600 rounded-full h-8 w-8 flex items-center justify-center shadow-xl">
                  {'<'}
                </button>
                <button onClick={handleNext} className="bg-green-600 rounded-full h-8 w-8 flex items-center justify-center shadow-xl">
                  {'>'}
                </button>
              </div>
            </div>
            <div className="grid grid-row-4 overflow-hidden">

            </div>
          </div>

          <div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Users;