import {
  BabyChangingStation,
  MailOutlined,
  TuneOutlined,
} from '@mui/icons-material';
import gambar1 from '../../../public/codexlogo.png';
import gambar2 from '../../../public/codexlogo.png';
import gambar3 from '../../public/logo3.png';
import mahakam from '../../../public/codexlogo.png';
import astra from '../../../public/codexlogo.png';
import bumn from '../../../public/codexlogo.png';
import ibm from '../../../public/codexlogo.png';
import mandiri from '../../../public/codexlogo.png';
import bsi from '../../../public/codexlogo.png';
import sinarmas from '../../../public/codexlogo.png';
import ot from '../../../public/codexlogo.png';
import codeid from '../../../public/codexlogo.png';

const dataDummy = [
  {
    section: 'Technical',
    type: 'hardskill',
    skills: [
      { name: 'Fundamental', week: 12, tags: 'fundamental' },
      { name: 'Object Oriented Programming', week: 12, tags: 'oop' },
      { name: 'Database', week: 12, tags: 'database' },
    ],
  },
  {
    section: 'Softskill',
    type: 'softskill',
    skills: [
      { name: 'Communication', week: 12, tags: 'communication' },
      { name: 'Team Work', week: 12, tags: 'teamwork' },
      { name: 'Selft Learning', week: 12, tags: 'selft_learning' },
    ],
  },
  {
    section: 'Presentation',
    type: 'softskill',
    skills: [
      { name: 'Public Speaking', week: 12, tags: 'public_speaking' },
      { name: 'Self Confident', week: 12, tags: 'self_confident' },
      { name: 'Adaptation', week: 12, tags: 'adaptation' },
    ],
  },
];

export const DataCarousel = [
  {
    judul: 'Bootcamp Reguler',
    isi: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
        doloribus ullam ratione repellat iusto voluptatem animi consectetur
        architecto molestias impedit quisquam, praesentium odit corporis
        esse quibusdam at earum? Minima consequuntur architecto provident
        culpa repellat cum error totam mollitia perferendis eligendi sequi
        eveniet adipisci eum suscipit qui, natus exercitationem tenetur
        nostrum veritatis in. Ipsum animi, nobis incidunt quis tempore
        asperiores tempora voluptates consequuntur minima eius sit? Ducimus,
        placeat asperiores. Totam nisi, laboriosam est nihil molestias
        sapiente placeat quas maiores tenetur ducimus molestiae quisquam
        repellendus rem harum minima exercitationem doloribus? Nulla tempora
        facilis et expedita eligendi quaerat cupiditate? Sed ipsum labore
        ullam?`,
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: '../../../public/Bimoli.jpg',
  },
  {
    judul: 'Bootcamp Online',
    isi: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
        doloribus ullam ratione repellat iusto voluptatem animi consectetur
        architecto molestias impedit quisquam, praesentium odit corporis
        esse quibusdam at earum? Minima consequuntur architecto provident
        culpa repellat cum error totam mollitia perferendis eligendi sequi
        eveniet adipisci eum suscipit qui, natus exercitationem tenetur
        nostrum veritatis in. Ipsum animi, nobis incidunt quis tempore
        asperiores tempora voluptates consequuntur minima eius sit? Ducimus,
        placeat asperiores. Totam nisi, laboriosam est nihil molestias
        sapiente placeat quas maiores tenetur ducimus molestiae quisquam
        repellendus rem harum minima exercitationem doloribus? Nulla tempora
        facilis et expedita eligendi quaerat cupiditate? Sed ipsum labore
        ullam?`,
    label: 'Bird',
    imgPath: '../../../public/Bimoli.jpg',
  },
  {
    judul: 'Bootcamp Coorporat',
    isi: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
        doloribus ullam ratione repellat iusto voluptatem animi consectetur
        architecto molestias impedit quisquam, praesentium odit corporis
        esse quibusdam at earum? Minima consequuntur architecto provident
        culpa repellat cum error totam mollitia perferendis eligendi sequi
        eveniet adipisci eum suscipit qui, natus exercitationem tenetur
        nostrum veritatis in. Ipsum animi, nobis incidunt quis tempore
        asperiores tempora voluptates consequuntur minima eius sit? Ducimus,
        placeat asperiores. Totam nisi, laboriosam est nihil molestias
        sapiente placeat quas maiores tenetur ducimus molestiae quisquam
        repellendus rem harum minima exercitationem doloribus? Nulla tempora
        facilis et expedita eligendi quaerat cupiditate? Sed ipsum labore
        ullam?`,
    label: 'Bali, Indonesia',
    imgPath: '../../../public/Bimoli.jpg',
  },
];

export const Card = [
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: 'NodeJs Full Stack',
    tugas: 'Build Rest API With NodeJs',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: 'Java Developer',
    tugas: 'Build Rest API With Java',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: '.NET Core',
    tugas: 'Build Rest API With .NET',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: 'Flutter',
    tugas: 'Build Rest API With Flutter',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: 'Android Developer',
    tugas: 'Build Rest API With Android',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    judul: 'Golang ',
    tugas: 'Build Rest API With Golang',
    durasi: '3 Bulan',
    Pembelian: 'Online / Offline',
  },
];

export const ApplyProgressDashboard = [
  {
    gambar: gambar1,
    judul: '.NET Core Bootcamp',
    applyDate: '12-juni-2021',
    status: 'passed',
    progress: 'Waiting List',
  },
  {
    gambar: gambar2,
    judul: 'Java Fullstack Bootcamp',
    applyDate: '12-maret-2021',
    status: 'failed',
    progress: 'Filtering Test',
  },
  {
    gambar: gambar2,
    judul: 'NodeJs Bootcamp',
    applyDate: '12-september-2023',
    status: 'passed',
    progress: 'Waiting List',
  },
];

export const items: any = [
  {
    title: 'Navigation One',
    key: 'sub1',
    icon: <MailOutlined />,
    children: [
      {
        title: 'Option 1',
        key: '1',
        children: [
          {
            title: 'Samping 1',
            key: '1-1',
          },
          {
            title: 'Samping 2',
            key: '1-2',
          },
        ],
      },
      {
        title: 'Option 2',
        key: '2',
      },
      {
        title: 'Option 3',
        key: '3',
      },
      {
        title: 'Option 4',
        key: '4',
      },
    ],
  },
  {
    title: 'Navigation Two',
    key: 'sub2',
    icon: <BabyChangingStation />,
    children: [
      {
        title: 'Option 5',
        key: '5',
      },
      {
        title: 'Option 6',
        key: '6',
      },
      {
        title: 'Submenu',
        key: 'sub3',
        children: [
          {
            title: 'Option 7',
            key: '7',
          },
          {
            title: 'Option 8',
            key: '8',
          },
        ],
      },
    ],
  },
  {
    title: 'Navigation Three',
    key: 'sub4',
    icon: <TuneOutlined />,
    children: [
      {
        title: 'Option 9',
        key: '9',
      },
      {
        title: 'Option 10',
        key: '10',
      },
      {
        title: 'Option 11',
        key: '11',
      },
      {
        title: 'Option 12',
        key: '12',
      },
    ],
  },
];

export const partnerShip = [
  {
    nama: 'mahakam',
    gambar: mahakam,
  },
  {
    nama: 'bsi',
    gambar: bsi,
  },
  {
    nama: 'mandiri',
    gambar: mandiri,
  },
  {
    nama: 'astra',
    gambar: astra,
  },
  {
    nama: 'bumn',
    gambar: bumn,
  },
  {
    nama: 'ibm',
    gambar: ibm,
  },
  {
    nama: 'sinarmas',
    gambar: sinarmas,
  },
  {
    nama: 'ot',
    gambar: ot,
  },
  {
    nama: 'codeid',
    gambar: codeid,
  },
  {
    nama: 'gambar2',
    gambar: gambar2,
  },
];

export const alumniTestimoni = [
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Aji',
    batch: 'BATCH#1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Oji',
    batch: 'BATCH#1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Ojan',
    batch: 'BATCH#1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Dian',
    batch: 'BATCH#2',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Dafa',
    batch: 'BATCH#1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
  {
    gambar:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    nama: 'Efen',
    batch: 'BATCH#1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla. Quaerat nulla eos est? Magni pariatur vitae vero tempore labore voluptatem culpa esse, harum neque. Ratione sit quaerat et quod.',
  },
];

export default dataDummy;
