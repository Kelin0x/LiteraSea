// 服务器组件
import ReadingView from './ReadingView'

const books = [
  {
    id: "1",
    title: "道德经",
    author: "老子",
    chapters: [
      {
        id: 1,
        title: "第一章 道可道，非常道",
        content: `道可道，非常道。名可名，非常名。
无名天地之始，有名万物之母。
故常无欲，以观其妙；常有欲，以观其徼。
此两者同出而异名，同谓之玄。玄之又玄，众妙之门。`
      },
      {
        id: 2,
        title: "第二章 天下皆知美之为美",
        content: `天下皆知美之为美，斯恶已。皆知善之为善，斯不善已。
故有无相生，难易相成，长短相形，高下相倾，音声相和，前后相随。
是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。
夫唯弗居，是以不去。`
      },
      {
        id: 3,
        title: "第三章 不尚贤",
        content: `不尚贤，使民不争。不贵难得之货，使民不为盗。
不见可欲，使民心不乱。是以圣人之治，虚其心，实其腹，弱其志，强其骨。
常使民无知无欲。使夫智者不敢为也。为无为，则无不治。`
      }
    ]
  },
  {
    id: "2",
    title: "论语",
    author: "孔子",
    chapters: [
      {
        id: 1,
        title: "学而第一",
        content: `子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？
人不知而不愠，不亦君子乎？"
有子曰："其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。
君子务本，本立而道生。孝弟也者，其为仁之本与！"`
      },
      {
        id: 2,
        title: "为政第二",
        content: `子曰："为政以德，譬如北辰，居其所而众星共之。"
子曰："诗三百，一言以蔽之，曰：'思无邪'。"
子曰："导之以政，齐之以刑，民免而无耻。导之以德，齐之以礼，有耻且格。"`
      }
    ]
  }
];

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id
  }))
}

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id)
  if (!book) return <div>找不到书籍...</div>
  
  return <ReadingView book={book} />
}