import { useNavigate } from 'react-router-dom';
import Card from '../Card'
import { motion } from "framer-motion";
import { useStoredContext } from '../../contextApi/ContextApi';


const LandingPage = () => {
 const navigate= useNavigate();
 
 //whenever the access of token is required
 const { token }= useStoredContext();
 console.log("TOKEN FROM LANDING PAGE:" + token)
  const dashBoardNavigateHandler=()=>{

  }
  
  return (
    <div className="min-h-[calc(100vh-64px)]  lg:px-14 sm:px-8 px-4" >
      <div className="lg:flex-row flex-col lg:py-5 pt-16 lg:gap-10 gap-8 flex justify-between items-center">
        <div className=" flex-1">
          <motion.h1 
          initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          className="font-bold font-roboto text-slate-800 md:text-5xl sm:text-4xl text-3xl   md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full">
            LinkForge-Tagline
          </motion.h1>
                <motion.p 
                initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-slate-700 text-sm my-5">
            LinkForge- Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit obcaecati soluta id, minima quo facilis.
          </motion.p>
          <div className='flex items-center gap-3'>
            <motion.button 
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={dashBoardNavigateHandler}
            className='bg-custom-gradient w-40 text-white rounded-md py-2'>
              Manage Links
            </motion.button>
            <motion.button 
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
             onClick={dashBoardNavigateHandler}
            className='border-btnColor border w-40 text-btnColor rounded-md py-2'>
              Create short link
            </motion.button>
          </div>
          </div>
           
          <div className='flex-1 flex justify-center w-full'>
            <motion.img  
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:w-[200px] w-[400px] object-cover rounded-md" 
            src="/images/image.png" alt="Image loading" />
          </div>
          </div>

          <div className="sm:pt-12 pt-7">
            <motion.p 
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-slate-800 font-roboto font-bold lg:w-[60%]  md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center">
           Trusted by individuals and teams at the world best companies{" "}
            </motion.p>
            <motion.div 
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
           <Card
           title="Simple URL Shortening" 
           desc= "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente quae ex error omnis nemo rerum perferendis?"   />
                  <Card
           title="Simple URL Shortening" 
           desc= "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente quae ex error omnis nemo rerum perferendis?"   />
                  <Card
           title="Simple URL Shortening" 
           desc= "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente quae ex error omnis nemo rerum perferendis?"   />
                  <Card
           title="Simple URL Shortening" 
           desc= "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente quae ex error omnis nemo rerum perferendis?"   />
          </motion.div>

          </div>
      
      
    </div>
  )
}

export default LandingPage
