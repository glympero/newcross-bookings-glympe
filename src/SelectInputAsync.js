import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class SelectInputAsync extends Component {
  constructor(props) {
    super(props)
    this.url = this.props.url
  }
  getOptions() {
    return axios.get(this.url).then(response => {
      let res = []
      console.log()
      response.data.skills.map(obj => {
        res.push({
          id: obj,
          value: obj
        })
        return true
      })

      return { options: res }
    })
  }
  onChange(event) {
    //console.log(event.value)

    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value)
    } else {
      // Clear the input field
      this.props.input.onChange(null)
    }
  }

  render() {
    return (
      <Select.Async
        {...this.props}
        value={this.props.input.value || ''}
        //onBlur={() => this.props.input.onBlur(this.props.input.value)}
        onChange={this.onChange.bind(this)}
        loadOptions={this.getOptions.bind(this)}
        valueKey="id"
        labelKey="value"
        placeholder="Select Competencies or Required"
        clearable={null}
      />
    )
  }
}

export default SelectInputAsync
