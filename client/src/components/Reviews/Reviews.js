import "./Reviews.css";

export const Reviews = () => {
    return (
        <section className='reviews' id='reviews'>
            <div className='heading'>
                <h1>
                    Our <span>Customers</span>
                </h1>
            </div>

            <div className='reviews-container'>
                <div className='box'>
                    <img src='/images//photo-1633332755192-727a05c4013d.jfif' alt='' />
                    <p>
                        These shoes are incredibly comfortable and stylish, perfect for both casual and formal
                        occasions.
                    </p>
                    <h2>Will Smith</h2>
                </div>
                <div className='box'>
                    <img
                        src='https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/E12KS1G65-W0168RE00G7-133faf432639-512.jpeg'
                        alt=''
                    />
                    <p>These shoes exceeded my expectations; they are lightweight, breathable, for everyday wear.</p>
                    <h2>Sarah Miller</h2>
                </div>
                <div className='box'>
                    <img
                        src='https://img.freepik.com/free-photo/portrait-happy-young-woman-looking-camera_23-2147892777.jpg?w=2000'
                        alt=''
                    />
                    <p>The customer service was excellent, and the shoes arrived quickly. Highly recommended!</p>
                    <h2>David Peterson</h2>
                </div>
                <div className='box'>
                    <img
                        src='https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.webp?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU='
                        alt=''
                    />
                    <p>I've received so many compliments on these shoes; they're definitely a conversation starter.</p>
                    <h2>Emily Roberts</h2>
                </div>
                <div className='box'>
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8UhtGp5wLix-_DMObDLqOb8Vzw8Y4C0e0K9IC7SEQKbiZ4LJXm3JI7RdCyU2Fyh4peIM&usqp=CAU'
                        alt=''
                    />
                    <p>These shoes provide great arch support and cushioning, making them ideal for long walks.</p>
                    <h2>Ava Lopez</h2>
                </div>
                <div className='box'>
                    <img src='https://handsontek.net/images/SharePoint/ProfilePicture/Outlook.PNG' alt='' />
                    <p>The color options for these shoes are fantastic, allowing me to match them with any outfit.</p>
                    <h2>Lily Kennedy</h2>
                </div>
            </div>
        </section>
    );
};
