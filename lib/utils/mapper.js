'use strict';;

module.exports = {
    toShortUser(users) {
        return users.map(u => ({ id: u.id, username: u.username }));
    },
    toUsername(user) {
        return { username: user.username };
    },
    toUserWithToken(user, token) {
        return { username: user.username, token };
    },
    toUserWithMaterials(user) {
        return {
            username: user.username,
            id: user.id,
            userMaterials: user.userMaterials
        };
    },
    toMaterialResponse(material) {
        return {
            id: material.id,
            title: material.title,
            description: material.description,
            createdAt: material.createdAt,
            img: material.img,
            commentsCount: material.comments.length,
            user: {
                id: material.user.id,
                username: material.user.username
            },
            comments: material.comments
        };
    },
    toMaterialsResponse(materials) {
        return materials.map(this.toMaterialResponse);
    }



}
// Try mongoose projection instead