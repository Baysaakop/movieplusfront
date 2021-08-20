import { List, Avatar, Tag } from 'antd';
import React from 'react';

const data = [
    {
        title: 'Б.Энхбаяр',
        description: 'Үүүүүүүүү...',
        number: 10000,
        avatar: "https://scontent.fuln2-1.fna.fbcdn.net/v/t1.15752-9/101568430_257574548810298_4914460348060373276_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=-YCVL4r6U0AAX_L_ouu&_nc_ht=scontent.fuln2-1.fna&oh=abe1134ebe5ad00992d251ca9bc6554b&oe=60919DB4",
        date: '3/18/2021, 8:58:09 AM',
    },
    {
        title: 'Ч.Чойжин',
        description: 'Үсийг чинь хусна.',
        number: 9999,
        avatar: "https://scontent.fuln2-1.fna.fbcdn.net/v/t1.15752-9/102719355_649032535701407_8915476942440918859_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=mfCu-lz3AysAX-wF_t5&_nc_ht=scontent.fuln2-1.fna&oh=3aa5dd7de8477cc86d3063ff140adaba&oe=6091938B",
        date: '3/18/2021, 7:25:14 AM',
    },
    {
        title: 'Т.Ганзориг',
        description: 'Жав уу?',
        number: 9500,
        avatar: "https://scontent.fuln2-1.fna.fbcdn.net/v/t1.15752-9/117623690_1386701261540443_5963031110049633392_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=ae9488&_nc_ohc=nPr0K9yZDFUAX8WjdQO&_nc_ht=scontent.fuln2-1.fna&oh=99f3ea384e11e660bf57afb595f70fab&oe=6093885F",
        date: '3/18/2021, 7:11:55 AM',
    },
    {
        title: 'У.Эрхэмбаяр',
        description: 'Намайг Темпо гэдэг.',
        number: 9400,
        avatar: "https://scontent.fuln2-1.fna.fbcdn.net/v/t1.15752-9/101851476_1180953878921548_6113419286855083245_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=ae9488&_nc_ohc=rLRz_EgGIFIAX8_A3cK&_nc_ht=scontent.fuln2-1.fna&oh=1d82ddb24eb349bfd1766a8f1fdf880b&oe=6091942D",
        date: '3/17/2021, 23:28:45 AM',
    },
];

const dataCompany = [
    {
        title: 'Юнител Грүпп',
        description: 'Боломжоо атга',
        number: 88888,
        avatar: "https://media-exp1.licdn.com/dms/image/C560BAQGlqoMNnZjJpg/company-logo_200_200/0/1519876064379?e=2159024400&v=beta&t=mv5CXj-aqvyq9OHg-11s3jWixrYf8DqA9-W0WnuuYhI",
        date: '3/18/2021, 8:58:09 AM',
    },
    {
        title: 'NCD Грүпп',
        description: 'Ногоон хөгжил бидний ирээдүй',
        number: 70000,
        avatar: "data:image/jpeg;base64,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",
        date: '3/18/2021, 7:25:14 AM',
    },
    {
        title: 'Ард санхүүгийн нэгдэл',
        description: 'Хүчтэй, Хамтдаа',
        number: 55000,
        avatar: "https://media-exp1.licdn.com/dms/image/C560BAQHJHZjCD3qtfg/company-logo_200_200/0/1610075365101?e=2159024400&v=beta&t=FMySGgTtjJEk0RENn6GB9z9LSBC4JSosvlM33l1a0oM",
        date: '3/18/2021, 7:11:55 AM',
    },
    {
        title: 'Худалдаа Хөгжлийн Банк',
        description: 'Хөгжил дэвшилд хамтдаа',
        number: 50000,
        avatar: "https://play-lh.googleusercontent.com/oLKxnYGEgAyoxZ4rG6ogqzoLQMIUC7wrAuE7tca9PKWZubIev1t3CvvnJvpvj7KhKL4",
        date: '3/17/2021, 23:28:45 AM',
    },
];

function Leaderboard (props) {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={props.type === "people" ? data : dataCompany}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size={80} shape="circle" style={{ border: '1px solid #fff' }} src={item.avatar} />}
                            title={
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <a href="https://ant.design">{item.title}</a>
                                    <Tag color="green" style={{ fontSize: '16px' }}>{item.number} мод</Tag>      
                                </div>                                
                            }
                            description={
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>{item.description}</div>
                                    <div>{item.date}</div>
                                </div>                                  
                            }
                        />
                        {/* <div>
                            <Tag color="green" style={{ fontSize: '16px' }}>{item.number} мод</Tag>                            
                        </div> */}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Leaderboard;