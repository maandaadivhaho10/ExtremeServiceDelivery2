export const Issues = [
    {
        issueId: 1,
        status: "Unresolved",
        date: "2024-03-04",
        location: "Klarinet",
        description: "Water Pipe has burst",
    },
    {
        issueId:2,
        status: "In Progress",
        date: "2023-05-04",
        location: "Del Judor",
        description: "Transformer is not working",
    },
    {
        issueId:3,
        status: "In Progress",
        date: "2023-03-04",
        location: "Lynville",
        description: "Big Pothole in the middle of the street",
    },
    {
        issueId:4,
        status: "In Progress",
        date: "2023-25-04",
        location: "Ben Fleur",
        description: "No electricity",
    },
    {
        issueId:5,
        status: "Resolved",
        date: "2023-03-12",
        location: "Vosman",
        description: "Sewerage Leak",
    },
    {
      issueId: 6,
      status: "In Progress",
      date: "2023-03-15",
      location: "Mapleton",
      description: "Pipe Burst",
    },
    {
      issueId: 7,
      status: "Received",
      date: "2023-04-01",
      location: "Riverside",
      description: "Park is dirty",
    },
    {
      issueId: 8,
      status: "Unresolved",
      date: "2023-04-20",
      location: "Lakeside",
      description: "Street Lights are not working",
    },
    {
      issueId: 9,
      status: "In Progress",
      date: "2023-05-10",
      location: "Greenwood",
      description: "Pipe burst",
    },
    {
      issueId: 10,
      status: "Received",
      date: "2023-05-22",
      location: "Harrison",
      description: "Traffic at robot",
    }
]

export const Supervisors = [
    {
        id: 1,
        name: "Mandla",
        surname: "Scott",
        email: "mandla@gmail.com",
        issueIds: [1, 2],
    },
    {
        id: 2,
        name: "Tshepo",
        surname: "Makamu",
        email: "tshepo@gmail.com",
        issueIds: [3],
    },
    {
        id: 3,
        name: "Julius",
        surname: "Breakfast",
        email: "julius@gmail.com",
        issueIds: [4],
    },
    {
        id: 4,
        name: "Thembeka",
        surname: "Du Preez",
        email: "thembeka@gmail.com",
        issueIds: [5],
    },
    {
        id: 5,
        name: "Nomathemba",
        surname: "Lively",
        email: "nomathemba@gmail.com",
        issueIds: [6,7],
    },
    {
        id: 6,
        name: "Nia",
        surname: "Long",
        email: "nia@gmail.com",
        issueIds: [8,9],
    },
    {
        id: 7,
        name: "Matthew",
        surname: "Long",
        email: "matthew@gmail.com",
        issueIds: [10],
    },
    {
        id: 8,
        name: "Katlego",
        surname: "Shabalala",
        email: "katshab@gmail.com",
        issueIds: [],
    },
]

export const Users = [
    {
        id: 1,
        name: "Neo",
        surname: "Mohale",
        emailAddress: "neo@gmail.com",
        number: "0129204956",
        department: "Water and Sanitation",
    },
]