import React from 'react';
import styles from './Team.module.css';
import Navbar from './Navbar';
interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fatma Chirchi',
    title: 'CTO',
    description: 'Fatma is the visionary behind our company.',
    imageUrl: 'https://media.discordapp.net/attachments/1273267278015631432/1313411299719249920/image_2024-02-17_192819811-removebg-preview.png?ex=67500917&is=674eb797&hm=a3c08e4c50785e69bc785395b0dd64fc227e5e74d62ae33191a17df9f2428b9d&=&format=webp&quality=lossless&width=412&height=486',
  },
  {
    name: 'Ahmed Boukottaya',
    title: 'CTO',
    description: 'Ahmed leads our technology initiatives.',
    imageUrl: 'https://scontent.ftun2-2.fna.fbcdn.net/v/t39.30808-6/462745246_2548996061969658_5532531328131162276_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LNr1469W_XAQ7kNvgGDbxvX&_nc_zt=23&_nc_ht=scontent.ftun2-2.fna&_nc_gid=AFchURmbXzn2bF4YO7mfEWv&oh=00_AYALdAU6fciKNesCV4tkqMnpBxRZau4qOIt4q-B5eWH18Q&oe=6754A9BC',
  },
  {
    name: 'Malek Adouni',
    title: 'Marketing Manager',
    description: 'Malek drives our marketing strategies.',
    imageUrl: 'https://media.discordapp.net/attachments/1271088963096018966/1313411206203310112/IMG-20241202-WA0058.jpg?ex=67500901&is=674eb781&hm=a95912179a781ca8468fa4be647e9b39bb892bf6649b8c9d49b86a73affc3f29&=&format=webp&width=497&height=662',
  },
  {
    name: 'Yassine Mbarki',
    title: 'Lead Developer',
    description: 'Yassine develops the core features of our product.',
    imageUrl: 'https://media.discordapp.net/attachments/1271088963096018966/1313432447156879431/20241203_101114.jpg?ex=67501cc9&is=674ecb49&hm=d767cd472770a4514a9f54e9035e7a9e210a7c1d353be01931d66607f50df6d7&=&format=webp&width=372&height=661',
  },
  {
    name: 'Saif Mejri',
    title: 'Lead Developer',
    description: 'Saif develops the core features of our product.',
    imageUrl: 'https://media.discordapp.net/attachments/1271088963096018966/1313434817051754516/20241203_102032.jpg?ex=67501efe&is=674ecd7e&hm=bbc0687fb55fc71c36ceae198e8bcca6da473f5bf7c65232023932026c96b469&=&format=webp&width=372&height=661',
  },
];

const OurTeam: React.FC = () => {
  return (
    <div className={styles.team}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <h1 className={styles.teamH1}>Our Team</h1>
        <p className={styles.teamP}>Meet our dedicated team of professionals!</p>
        <div className={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div className={styles.teamMember} key={index}>
            <img src={member.imageUrl} alt={member.name} />
            <h2>{member.name}</h2>
            <h3>{member.title}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OurTeam;