import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
// @ts-ignore
import parsePdb from 'parse-pdb';

const Main: NextPage = () => {
  const [email, setEmail] = useState(false);
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useState('');
  const showFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      setFile(String(text));
    };
    reader.readAsText(e.target.files![0]);
  };

  const handleSendFileToServer = async () => {
    const response = await fetch('http://localhost:8080/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: file,
        email: null,
      }),
    }).then((res) => res.json());
    alert(response.uuid);
  };

  useEffect(() => {
    if (isOk) {
      // alert(isOk ? 'Data sent to processing' : 'File is not correct');
    }
  }, [isOk]);

  useEffect((): void => {
    fetch('https://www.rcsb.org/search/suggest/40')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title className="bg-gray-300">RNAminifier</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          Get started by uploading file or picking from Protein DB
        </p>
        <span>
          <input
            type="file"
            accept=".pdb"
            onChange={(e: ChangeEvent<HTMLInputElement>) => showFile(e)}
          />
          <span className="mr-10">or</span>
          <span>
            <label htmlFor="autocomplete" className="mr-5">
              Find your protein:
            </label>
            <input id="autocomplete" type="text" className="border-2 rounded" />
          </span>
        </span>
        <div className="mt-3 flex  items-center justify-center">
          Send notification by email
          <input
            type="checkbox"
            onChange={(): void => setEmail((prevState) => !prevState)}
          />
        </div>
        {email && (
          <div className="mt-5">
            <span className="mr-3">email:</span>
            <input className="border-2 rounded" />
          </div>
        )}
        <div style={{ marginTop: '10px' }}>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const { atoms } = parsePdb(file);
              console.log(file);
              setIsOk(atoms.length > 0 ? true : false);
              handleSendFileToServer();
            }}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default Main;
