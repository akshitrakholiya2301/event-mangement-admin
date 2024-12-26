export const ENUM_FOR_CHARITY_MANAGEMENT_TAB = {
    ALL_CHARITY: "",
    REQUESTED_CHARITY: "requested",
    CANCELLED_CHARITY: "cancelled",
}
export const ENUM_FOR_LISTING_VIEW = {
    GRID_VIEW: "Grid View",
    LIST_VIEW: "List View"
}
export const ENUM_FOR_TABLE_HEADERS = {
    NAME_FOR_MANGEMENT: "Name",
    ID_FOR_MANGEMENT: "Charity Id",
    DESCRIPTION_FOR_MANGEMENT: "Description",
    AUTHOR_FOR_MANGEMENT: "Author",
    DATE_FOR_MANGEMENT: "Date",
    TARGET_FOR_MANGEMENT: "Target",
    COLLECTED_FOR_MANGEMENT: "Collected",
    PROGRESS_FOR_MANGEMENT: "Progress",
    STATUS_FOR_MANGEMENT: "Status",

}
export const ENUM_FOR_TABLE_REQUEST_HEADERS = {
    NAME_FOR_MANGEMENT: "charity_name",
    ID_FOR_MANGEMENT: "formated_id",
    DESCRIPTION_FOR_MANGEMENT: "description",
    AUTHOR_FOR_MANGEMENT: "author",
    DATE_FOR_MANGEMENT: "createdAt",
    TARGET_FOR_MANGEMENT: "goal_amount",
    COLLECTED_FOR_MANGEMENT: "collected_amount",
    // PROGRESS_FOR_MANGEMENT:"Progress",

}
export const ENUM_FOR_SORT_ORDER = {
    ASC: "ASC",
    DESC: "DESC",

}


export const ENUM_FOR_BLOGS_TABLE_HEADERS = {
    TITLE: "Title",
    AUTHOR: "Author",
    DATE: "Date",
    TAGS: "Tags",
    LIKES: "Likes",
    ACTIONS: "Actions",
}

export const ENUM_FOR_BLOGS_KEY_TABLE_HEADERS = {
    TITLE: "heading",
    AUTHOR: "author_name",
    DATE: "createdAt",
    TAGS: "tags",
    LIKES: "likes",
    ACTIONS: "",
}

export const ENUM_FOR_STUTUS = [
    { value: "Published", label: "Published" },
    { value: "UnPublished", label: "UnPublished" },
]

export const ENUM_FOR_BLOG_CREATE_PRIVIEW = {
    CREATE_BLOG: "CREATE_BLOG",
    PREVIEW_BLOG: "PREVIEW_BLOG"
}

export const ENUM_FOR_TAGS = [
    { value: 1, label: "cancer" },
    { value: 2, label: "health" },
]
export const ENUM_FOR_CHARITY_STATUS = {
    PUBLISH: "Publish",
    UNPUBLISH: "Unpublish",
    REQUESTED: "requested",
    APPROVED: "approved"

}

export const ENUM_FOR_BLOG_STATUS = {
    Cancelled: "Rejected",
    Published: "Published",
    Unpublished: "Unpublished",
    Requested: "Requested",
    Draft: "Draft"
}