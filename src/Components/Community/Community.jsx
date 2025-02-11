import React from 'react'
import UnderLine from '../UnderLine/UnderLine';
import img1 from "../../assets/images/profile photo.png";
import img2 from "../../assets/images/profilephoto2.png";
import img3 from "../../assets/images/Ellipse 7.png";
import img4 from "../../assets/images/image 62.png";


export default function Community() {





  return (
    <>
   <div className="container mx-auto">
    <div className=" flex-wrap justify-center jsutify-items-center ">

        <div className="community-title lg:w-1/4 sm:w-1/2 text-center my-10 mt-20 mx-auto">

        <h1 className="mx-auto text-2xl">
            Community

            <div className="w-1/2 mx-auto">
                          <UnderLine />
                        </div>
        </h1>
        <p className='mx-5'>

        Our community connects users, enabling car solutions, trusted advice, and seamless product recommendations efficiently.
        </p>

        </div>



        <div className="flex flex-wrap justify-center mx-auto">

      
        <div className="posts">
        <div className="creation-card relative text-white  bg-gray-800 p-5 w-[620px] mx-5 my-5 rounded-xl ">
            <h3 className='mb-3 text-xl'>
                create post
            </h3>

            <p className={`absolute  top-[68px] left-8 text-black`}>
            <i className="fa-solid fa-comment-dots text-xl"></i>
      </p>

            <input
            className='w-full rounded-xl px-8 pb-3 text-black'
            type="text" 
            placeholder='What’s on your mind'
             />

<div className="buttons flex justify-between mt-5">
<button className='bg-black text-white px-5 py-2 rounded-lg'>
    <i className="fa-solid fa-photo-film"></i> Media 
    </button>
<button className='bg-black text-white px-5 py-2 rounded-lg'>
     <i className="fa-solid fa-paper-plane"></i> Publish
    </button>

</div>

        </div>

<div className="post text-white bg-gray-800 p-5 w-[620px] mx-5 my-5 rounded-xl">

<div className="profile flex">
<div className="profile-pic w-16 ">
  <img src={img1} alt="" />
</div>

<div className="info mt-2 ml-2">
  <h3 className='text-lg'>Muhamed Baher</h3>
  <span className='text-gray-500'>5 Min Ago</span>
</div>
</div>

<p className='text-lg px-2 pt-5 pb-1'>
A lot of us face unexpected car issues, and most of the time, it’s due to <br /> br skipping regular <br /> Here are some tips to help you keep your car.. <br />
<p className='px-1'>
1.Change the oil regularly: Staying on top of oil changes can prevent major engine problems. <br />
2.Check tire pressure: Proper tire pressure improves performance and saves fuel. <br />
<p className="truncate">
3.Inspect the battery: Regularly check your car battery, especially before winter.
Clean the filters: Replacing the air and fuel filters can boost engine efficiency.
</p>
</p>
</p>

<div className="w-full mx-auto">
                          <UnderLine />
</div>

<div className="buttons mt-5">
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg mr-3"><i className="fa-regular fa-thumbs-up"></i> 521 Likes</button>
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"><i className="fa-regular fa-comments"></i> 59 Comments</button>
</div>



</div>




<div className="post text-white bg-gray-800 p-5 w-[620px] mx-5 my-5 rounded-xl">

<div className="profile flex">
<div className="profile-pic w-16 ">
  <img src={img1} alt="" />
</div>

<div className="info mt-2 ml-2">
  <h3 className='text-lg'>Muhamed Baher</h3>
  <span className='text-gray-500'>5 Min Ago</span>
</div>
</div>

<p className='text-lg px-2 pt-5 pb-1'>
A lot of us face unexpected car issues, and most of the time, it’s due to <br /> br skipping regular <br /> Here are some tips to help you keep your car.. <br />
<p className='px-1'>
1.Change the oil regularly: Staying on top of oil changes can prevent major engine problems. <br />
2.Check tire pressure: Proper tire pressure improves performance and saves fuel. <br />
<p className="truncate">
3.Inspect the battery: Regularly check your car battery, especially before winter.
Clean the filters: Replacing the air and fuel filters can boost engine efficiency.
</p>
</p>
</p>

<div className="w-full mx-auto">
<UnderLine />
</div>

<div className="buttons my-5">
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg mr-3"><i className="fa-regular fa-thumbs-up"></i> 521 Likes</button>
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"><i className="fa-regular fa-comments"></i> 59 Comments</button>
</div>

<div className="w-full mx-auto">
<UnderLine />
</div>

<div className="comments">

<div className="comment flex justify-items-center">
  <img className='w-12 h-12 mt-3' src={img1} alt="" />
  <div className="comment-info mt-2 ml-2 border-2 rounded-lg px-2 py-1">
    <p className="name font-semibold text-sm">Youssef Mohammed</p>
    <p className='comment-discription text-sm'>This Really Amazing it Helps Alot!</p>
  </div>
</div>

<div className="comment flex justify-items-center mt-3">
  <img className='w-12 h-12 mt-3' src={img2} alt="" />
  <div className="comment-info mt-2 ml-2 border-2 rounded-lg px-2 py-1 w-1/2">
    <p className="name font-semibold text-sm">Omar Elrakby</p>
    <p className='comment-discription text-sm'>"Great tips! I'd also suggest checking brake pads and fluid levels regularly. Ignoring these can lead to safety issues and expensive repairs. What do you recommend for maintaining older cars during the winter season? 👌🚗"</p>
  </div>
</div>

<div className="add-comment relative">
<span className={`absolute  top-[85px] left-3 text-black`}>
            <img src={img3} alt="" />
      </span>

<input type="text" 
placeholder='Write your comment'
className='w-full border-2 rounded-full mt-20 bg-transparent py-3 px-14'
id='comment' />

</div>

</div>



</div>


<div className="post text-white bg-gray-800 p-5 w-[620px] mx-5 my-5 rounded-xl">

<div className="profile flex">
<div className="profile-pic w-16 ">
  <img src={img1} alt="" />
</div>

<div className="info mt-2 ml-2">
  <h3 className='text-lg'>Muhamed Baher</h3>
  <span className='text-gray-500'>5 Min Ago</span>
</div>
</div>

<p className='text-lg px-2 pt-5 pb-1'>
A lot of us face unexpected car issues, and most of the time, it’s due to <br /> br skipping regular <br /> Here are some tips to help you keep your car.. <br />
<p className='px-1'>
1.Change the oil regularly: Staying on top of oil changes can prevent major engine problems. <br />
2.Check tire pressure: Proper tire pressure improves performance and saves fuel. <br />
<p className="truncate">
3.Inspect the battery: Regularly check your car battery, especially before winter.
Clean the filters: Replacing the air and fuel filters can boost engine efficiency.
</p>
</p>
</p>

<img className='mt-2 mb-4' src={img4} alt="" />

<div className="w-full mx-auto">
                          <UnderLine />
</div>

<div className="buttons mt-5">
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg mr-3"><i className="fa-regular fa-thumbs-up"></i> 521 Likes</button>
  <button className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"><i className="fa-regular fa-comments"></i> 59 Comments</button>
</div>



</div>




        </div>



<div className="community-info bg-gray-800 p-5 w-[400px] mx-20 mt-5 text-center rounded-xl text-white h-[1092px]">

<h2 className='text-white text-3xl'><span className='text-red-700'>Car</span>Mate
<div className="my-2 w-32 mx-auto">
                <div className="bg-gradient-to-r from-red-700 via-red-950 to-black h-[2.5px] my-2 mx-auto"></div>
              </div>
</h2>

<p className="my-5">
Welcome to the <span className='text-red-700'>Car</span>Mate Community! 🚗✨ Here, we connect car owners, enthusiasts, and experts to make car care easier and smarter.
</p>

<dev className="community">
<h3 className="text-2xl mt-12">
  Community
  <div className="w-1/3 mx-auto">
                          <UnderLine />
                        </div>
</h3>

<p className='text-center'>Our community is a collaborative space where users 
can seek advice, share solutions, and connect with mechanics, electricians, and sellers. Together, we 
simplify car maintenance, resolve issues, and 
provide trusted recommendations.</p>
</dev>
<dev className="community-rules mt-12">
<h3 className="text-2xl mt-20">
  Community Rules
  <div className="w-1/2 mx-auto">
                          <UnderLine />
                        </div>
</h3>

<ul className='text-start list-disc pl-3'>
  <li>Respect Everyone: Treat all members with kindness and professionalism. Discrimination or offensive language will not be tolerated.</li>
  <li>
  Stay Relevant: Share content and questions related to car maintenance, repairs, and the automotive field only.
  </li>

  <li>
  No Spam: Avoid posting irrelevant promotions or repeated messages.
  </li>

  <li>
  Be Honest: Provide truthful and accurate information when sharing advice or recommendations.
  </li>

  <li>
  Protect Privacy: Do not share personal or sensitive information about yourself or others.
  </li>

  <li>
  Seek Expert Help When Needed: If unsure about advice, encourage professional consultation.
  </li>

  <li>
  Avoid Unsafe Practices: Do not suggest actions that could harm vehicles or individuals.
  </li>

<li>
Support Each Other: Foster a collaborative and positive environment where everyone feels welcome.
</li>

<li>
Report Issues: Notify moderators of any inappropriate behavior or content.
</li>

<li>
Follow Platform Terms: Adhere to the community guidelines and terms of the CarMate platform.
</li>
</ul>
</dev>
  
</div>




      </div>







        </div>

    </div>
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
