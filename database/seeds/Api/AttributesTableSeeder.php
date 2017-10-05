<?php

use Illuminate\Database\Seeder;
use Faker\Factory;
use GetCandy\Api\Attributes\Models\Attribute;
use GetCandy\Api\Attributes\Models\AttributeGroup;
use GetCandy\Api\Products\Models\Product;

class AttributesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $group = AttributeGroup::create([
            'name' => ['en' => 'Marketing', 'sv' => 'Marknadsförande'],
            'handle' => 'marketing',
            'position' => 1
        ]);

        $attribute = new Attribute();
        $attribute->name = ['en' => 'Name', 'sv' => 'Namn'];
        $attribute->handle = 'name';
        $attribute->position = 1;
        $attribute->group_id = $group->id;
        $attribute->required = true;
        $attribute->scopeable = 1;
        $attribute->save();

        $attribute = new Attribute();
        $attribute->name = ['en' => 'Description', 'sv' => 'Beskrivning'];
        $attribute->handle = 'description';
        $attribute->position = 2;
        $attribute->group_id = $group->id;
        $attribute->channeled = 1;
        $attribute->required = true;
        $attribute->type = 'textarea';
        $attribute->scopeable = 1;
        $attribute->save();

        $attribute = new Attribute();
        $attribute->name = ['en' => 'Orientation', 'sv' => 'Orientering'];
        $attribute->handle = 'orientation';
        $attribute->position = 3;
        $attribute->group_id = $group->id;
        $attribute->type = 'select';
        $attribute->scopeable = 0;
        $attribute->lookups = [
            ['value' => 'landscape', 'label' => 'Landscape'],
            ['value' => 'portrait', 'label' => 'Portrait'],
        ];
        $attribute->save();

        $group = AttributeGroup::create([
            'name' => ['en' => 'General', 'sv' => 'Allmän'],
            'handle' => 'general',
            'position' => 1
        ]);

        $attribute = new Attribute();
        $attribute->name = ['en' => 'Material', 'sv' => 'Väv'];
        $attribute->handle = 'material';
        $attribute->position = 1;
        $attribute->group_id = $group->id;
        $attribute->save();
    }
}
