import Head from 'next/head';

const Index = () => (
    <Head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
      <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"></link>

    </Head>
    <>
        <div>
        <h1>Dio lurido</h1>
        <style jsx>
            {`
            div {
                background: #333;
            }

            h1 {
                background: #222;
            }
            `}
        </style>
        </div>
    </>
);

export default Index;
