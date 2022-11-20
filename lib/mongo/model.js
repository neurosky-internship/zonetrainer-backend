'use strict';

class Model {
  constructor(model, properties) {
    this.model = model;
    this.properties = properties;
    this.exactQueryFields = ['_id'];
  }

  find(query, projection={}) {
    return this.model.find(query, projection).lean();
  };

  findByQuery(query, sort='createdAt', order='desc', projection={}) {
    return this.model.find(query, projection).sort({[sort]: order}).lean();
  };

  findById(_id) {
    return this.model.findById(_id).lean();
  };

  findOne(query, projection={}) {
    return this.model.findOne(query, projection).lean();
  };

  findOneByItemKey(itemKey) {
    return this.model.findOne({itemKey}).lean()
  }

  add(info) {
    return this.model.create(info);
  };

  updateOne(_id, info) {
    const unsetInfo = {};

    for(const key of this.properties.OPTIONAL_FIELDS) {
      if(!info.hasOwnProperty(key))
        unsetInfo[key] = '';
    }

    return this.model.updateOne({_id}, {$set: info, $unset: unsetInfo}, {runValidators: true});
  };

  upsertOne(_id, info) {
    return this.model.updateOne({_id}, {$set: info}, {upsert: true, runValidators: true});
  }

  updateMany(query, setInfo={}, unsetInfo={}) {
    return this.model.updateMany(query, {$set: setInfo, $unset: unsetInfo}, {runValidators: true});
  };

  updateOneByQuery(_id, updateInfo) {
    return this.model.updateOne({_id}, updateInfo, {runValidators: true});
  };

  countByQuery(query) {
    return this.model.countDocuments(query);
  };

}

module.exports = Model;
