const DuplicatesStore = class {

  // duplicate strings are replaced by index of 1st occurance.
  //
  // dehydrate: applies a filter to remove numeric index values.
  // rehydrate: expands a translated array of strings to re-add duplicate strings.
  normalized_input_strings_array = null

  constructor(input_strings_array) {
    // precondition
    if (!Array.isArray(input_strings_array))
      throw new Error('DuplicatesStore constructor requires an Array parameter')

    this.normalize_input_strings_array(input_strings_array)
  }

  normalize_input_strings_array(input_strings_array) {
    if (Array.isArray(this.normalized_input_strings_array)) return

    // val => index of 1st occurance
    const hashmap = {}

    this.normalized_input_strings_array = input_strings_array.map((val, index) => {
      if (hashmap[val] === undefined) {
        hashmap[val] = index
        return val
      }
      else {
        return hashmap[val]
      }
    })
  }

  dehydrate_input_strings_array() {
    return this.normalized_input_strings_array.filter(val => (typeof val === 'string'))
  }

  rehydrate_translated_strings_array(translated_strings_array) {
    const rehydrated_translated_strings_array = [...translated_strings_array]
    let val

    for (let index = 0; index < this.normalized_input_strings_array.length; index++) {
      val = this.normalized_input_strings_array[index]

      if (typeof val === 'number') {
        val = rehydrated_translated_strings_array[val]

        rehydrated_translated_strings_array.splice(index, 0, val)
      }
    }

    return rehydrated_translated_strings_array
  }
}

module.exports = DuplicatesStore
