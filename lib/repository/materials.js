'use strict';

const DEFAULT_IMG = "https://bitstorm.org/edwin/jquery-presentatie/pix/jquery_logo_color_onwhite.png";
const SORTING_ORDER = 'createdAt';

module.exports = (Model) => {

    return {
        getAllMaterials(filter) {
            filter = filter || '';

            return Model
                .find({
                    title: { $in: [filter] },
                    description: { $in: [filter] },
                    user: { username: { $in: [filter] } }
                })
                .sort(SORTING_ORDER)
                .exec();
        },
        createMaterial(title, description, img, user) {
            img = img || DEFAULT_IMG;

            return Model
                .create({ title, description, img, user });
        },
        getMaterialById(id) {
            return Model
                .findById(id)
                .exec();
        },
        addCommentToMaterial(materialId, commentText, user) {
            let comment = {
                text: commentText,
                user
            };

            return Model
                .findByIdAndUpdate(materialId, { $push: { comments: comment } }, { new: true })
                .exec();
        }

    }
}