import Head from "next/head"

export default function Layout({children, pagina}) {


    return (
      <>
        <Head>
          <title>Café - {pagina}</title>
          <meta name="description" content="Rest Food" />
        </Head>
        

        <div className="md:flex">
          <aside className="md:w-4/12">
            <h2>holis</h2>
          </aside>

          <main className="md:w-8/12">
            {children}
          </main>
        </div>
      </>

      
    )
  }