<?php

/**
 * @file
 * Lookup function for smarty streets api
 */

function springboard_advocacy_smarty_lookup($values) {
  
  $responses = array();
  $query =  array(
    'street' => $values['sbp_address'],
    'city' => $values['sbp_city'],
    'state' => $values['sbp_state'],
    'zipcode' => $values['sbp_zip'],
    'auth-id' => variable_get('springboard_advocacy_smarty_authid',''),
    'auth-token' => variable_get('springboard_advocacy_smarty_authtoken',''),
  );

  $url = url('https://api.smartystreets.com/street-address', array('query' => $query));

  $response = drupal_http_request($url);
  $geo = array();

  if (!empty($response->data)) {

    $data = json_decode($response->data);
 
    if(!empty($data)) {
      $geo['zip'] = isset($data[0]->components->zipcode) ? $data[0]->components->zipcode : '';
      $geo['plus4'] = isset($data[0]->components->plus4_code) ? $data[0]->components->plus4_code : '';
      $geo['county'] = isset($data[0]->metadata->county_name) ? $data[0]->metadata->county_name : '';
      $geo['fips'] = isset($data[0]->metadata->county_fips) ? $data[0]->metadata->county_fips : '';

      //$district = $data[0]->metadata->congressional_district;
      $geo['latitude'] = isset($data[0]->metadata->latitude) ? $data[0]->metadata->latitude : '';
      $geo['longitude'] = isset($data[0]->metadata->longitude) ? $data[0]->metadata->longitude : '';
    }
  }
  return $geo;
}