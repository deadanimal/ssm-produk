export class Topic {
    public id: string
    public name: string
    public active: boolean
    public category: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        active: boolean,
        category: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.active = active
        this.category = category
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class Subject {
    public id: string
    public name: string
    public active: boolean
    public topic: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        active: boolean,
        topic: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.active = active
        this.topic = topic
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class Note {
    public id: string
    public name: string
    public slug: string
    public language: string
    public description: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        slug: string,
        language: string,
        description: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.slug = slug
        this.language = language
        this.description = description
        this.created_date = created_date
        this.modified_date = modified_date
    }
}