import React, { useEffect, useState } from 'react'
import { Octokit } from 'octokit'
import UserDetails from './components/UserDetails/UserDetails'
import Repo from './components/Repo/Repo'
import Pagination from './components/Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder} from '@fortawesome/free-solid-svg-icons'
import GridLoader from "react-spinners/GridLoader";



export default function () {


  const [rep, setrep] = useState([])
  const [username, setusername] = useState('Xaid-vfx')
  const [count, setcount] = useState(0)
  const [loading, setloading] = useState(false)
  const [loading1, setloading1] = useState(false)
  const [name, setname] = useState()
  const [url, seturl] = useState()
  const [bio, setbio] = useState()
  const [link, setlink] = useState()
  const [size, setsize] = useState()

  const [page, setpage] = useState(1)




  useEffect(() => {


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        entry.target.classList.add('show', entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target)

      })

    })





    const boxElList1 = document.querySelectorAll('.Repos');
    boxElList1.forEach((el) => {
      observer.observe(el);

    })
    const boxElLis2 = document.querySelectorAll('.details');
    boxElLis2.forEach((el) => {
      observer.observe(el);

    })
  }, [loading])






  const octokit = new Octokit({
    auth: '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'
  });


  useEffect(() => {


    async function get() {

      setloading(true);

      const req1 = await octokit.request('GET /users/{username}/repos?page=1&per_page=1000', {
        username: username
      })

      setsize(req1.data.length)
      console.log(req1.data.size);


      const details = await octokit.request('GET /users/{username}', {
        username: username
      })
      // console.log(details);

      setloading(false)
      return [details.data]
    }


    if (username != '') {
      get().then(function (res) {

        // setrep(res[0]);
        console.log(res[0]);
        setname(res[0].login);
        seturl(res[0].avatar_url);
        setbio(res[0].bio);
        setlink(res[0].html_url)
      })


    }

  }, [count])


  useEffect(() => {


    async function repo() {

      setloading1(true)
      const req = await octokit.request('GET /users/{username}/repos?page={page}&per_page=8', {
        username: username, page: page
      })
      setloading1(false)

      setrep(req.data)
    }
    repo();

  }, [page, count])





  function setpagenum(p) {
    setpage(p)

    console.log(p);
  }



  return (
    <div>




      <div className='navbar'>
        <h2><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg> Repo</h2>

      </div>
      <div className='search'>
        <input type='text' placeholder='Enter a username' onChange={(e) => { setusername(e.target.value) }} />
        <button onClick={() => { setcount(count + 1) }}>Fetch</button>
      </div>


      <div className='loader'>
        {loading ? (<div className='loading1'>
          <GridLoader color='#4169E1' loading={loading1} size={20} /></div>)
          :
          (<div>
            <div className='alignuser'><UserDetails name={name} url={url} bio={bio} link={link} /></div>


            <div className='alignrepo'>
              <h1>Repositories 
              </h1>
              <div className='Repos'>

                {loading1 ? (
                  <div className='loading'>
                    <GridLoader color='#4169E1' loading={loading1} size={20} /></div>
                ) : (rep.map(e => {
                  return (

                    <Repo name={e.name} desc={e.description} lang={e.language} />

                  );
                }))}
              </div>


            </div>
            <div className='alignpage'>
              <Pagination set={setpagenum} size={size} count={count} />

            </div>
          </div>)}
      </div>





    </div>
  )
}
