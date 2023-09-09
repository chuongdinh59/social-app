const Status = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
  BANDED: 'BANDED'
};

const PostType = {
  SURVEY: 'SURVEY',
  POST: 'POST'
};

const QuestionType = {
  CHECKBOX: 'CHECKBOX',
  RADIO: 'RADIO',
  TEXT: 'TEXT'
};

const posts = [
  {
    id: 1,
    content: 'This is a sample post content.',
    lock_comment: false,
    created_date: '20-11-2023',
    modified_date: '20-11-2023',
    type: PostType.POST,
    user: {
      alumni_id: '2051052012',
      displayName: 'Chương giáo sư',
      email: 'chuongdinh2202@gmail.com',
      status: Status.ACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    }
  },
  {
    id: 2,
    content: 'Another sample post content.',
    lock_comment: true,
    count_action: 15,
    created_date: '20-11-2023',
    modified_date: '20-11-2023',
    type: PostType.SURVEY,
    user: {
      alumni_id: '2051052013',
      displayName: 'John Doe',
      email: 'johndoe@example.com',
      status: Status.DEACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    }
  },
  {
    id: 3,
    content: 'A third sample post.',
    lock_comment: true,
    count_action: 8,
    created_date: '20-11-2023',
    modified_date: '20-11-2023',
    type: PostType.POST,
    user: {
      alumni_id: '2051052014',
      displayName: 'Jane Smith',
      email: 'janesmith@example.com',
      status: Status.ACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    }
  },
  {
    id: 4,
    content: 'Yet another post.',
    lock_comment: false,
    count_action: 2,
    created_date: '20-11-2023',
    modified_date: '20-11-2023',
    type: PostType.POST,
    user: {
      alumni_id: '2051052015',
      displayName: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      status: Status.ACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    }
  },
  {
    id: 5,
    content: 'Fifth sample post.',
    lock_comment: true,
    count_action: 5,
    created_date: '20-11-2023',
    modified_date: '20-11-2023',
    type: PostType.POST,
    user: {
      alumni_id: '2051052016',
      displayName: 'Bob Williams',
      email: 'bobwilliams@example.com',
      status: Status.BANDED,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    }
  }
];
const imagePost = [
  {
    id: 1,
    url: 'https://w0.peakpx.com/wallpaper/1009/980/HD-wallpaper-bam-pop-random-omg-knuckles.jpg',
    post_id: 1
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    post_id: 1
  },
  {
    id: 7,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 1
  },
  {
    id: 8,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 1
  },
  {
    id: 2,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 2
  },
  {
    id: 3,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 3
  },
  {
    id: 4,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 4
  },
  {
    id: 5,
    url: 'https://source.unsplash.com/random?wallpapers',
    post_id: 5
  }
];

const survey = [
  {
    id: 1,
    content: 'Câu hỏi a',
    user: 'Nguyen Van A',
    postType: 'SURVEY',
    post_id: 2,
    questions: [
      {
        content: 'Trả lời a',
        questionType: 'CHECKBOX',
        answers: [
          {
            content: 'ABC'
          },
          {
            content: 'CDE'
          },
          {
            content: 'DEF'
          }
        ]
      },
      {
        content: 'Trả lời b',
        questionType: 'RADIO',
        answers: [
          {
            content: 'ABC'
          },
          {
            content: 'CDE'
          },
          {
            content: 'DEF'
          }
        ]
      },
      {
        content: 'Câu hỏi lời c text',
        questionType: 'TEXT'
      }
    ]
  }
];

const myComments = [
  {
    id: 1,
    post_id: 1,
    user: {
      alumni_id: '2051052016',
      displayName: 'Bob Williams',
      email: 'bobwilliams@example.com',
      status: Status.ACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    },
    content: 'Bài này hay vcl',
    action_count: 0
  },
  {
    id: 2,
    post_id: 1,
    user: {
      alumni_id: 'chudev',
      displayName: 'Bob Bob',
      email: 'bobwilliams@example.com',
      status: Status.ACTIVE,
      created_date: '20-11-2023',
      modified_date: '20-11-2023',
      avatar: 'https://source.unsplash.com/random?wallpapers'
    },
    content: 'Nice try bro',
    action_count: 0
  }
];
export { Status, PostType, QuestionType, posts, imagePost, survey, myComments };
