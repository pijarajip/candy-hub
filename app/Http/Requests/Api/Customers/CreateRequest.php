<?php

namespace GetCandy\Http\Requests\Api\Customers;

use GetCandy\Http\Requests\Api\FormRequest;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|unique:users,email',
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|confirmed',
            'language' => 'required|exists:languages,lang|enabled:languages,lang',
            'group' => 'exists:customer_groups,handle',
            'fields' => 'array'
        ];
    }
}
