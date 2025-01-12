function transformListings(data) {
    return data.map((listing, index) => {
      const item = listing.data;
      
      // Extract amenities from different fields and combine them
      const amenitiesList = [
        ...(item.appliances ? item.appliances.split(', ') : []),
        ...(item.utilities ? item.utilities.split(', ') : [])
      ];
  
      // Create fees array
      const fees = [
        {
          title: "Application Fee",
          amount: item.application_fee,
          property_id: item.property_uid,
          id: "1",
          description: "Application Fee"
        },
        {
          title: "Security Deposit",
          amount: item.deposit,
          property_id: item.property_uid,
          id: "1",
          description: "Application Fee"
        }
      ];
  
      // Extract image URLs
      const images = item.photos.map(photo => photo.url);
  
      return {
        id: (index + 1).toString(),
        externalId: item.listable_uid,
        propertyId: item.property_uid,
        type: "Apartment",
        description: item.marketing_description || item.meta_description,
        name: item.marketing_title,
        paymentDuration: "Monthly",
        fees: fees,
        price: item.market_rent,
        deposit: item.deposit,
        rooms: item.bedrooms,
        baths: item.bathrooms,
        incentives: ["$20 off on Security Deposit through cribX"],
        size: `${item.square_feet} sqft.`,
        amenities: amenitiesList,
        isAvailable: item.available,
        moveInDate: "08/15/2025", // Using static date as per example
        leaseTerms: [],
        images: images
      };
    });
  }
  
  // Parse the input data
//   const inputData = JSON.parse();
  
  // Transform the data
  const transformedData = transformListings(
    [
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=782+Clifty+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.1994272,-85.8844938",
            "address_latitude": 39.1894272,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/cf259e59-c949-487d-9296-d5413ee1df1c/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=a4189b9c-23f3-4f48-8340-569d3b263044&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "782 Clifty Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/7c967974-5311-466d-b07e-8dd85bc999a1/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/31bead58-3e3e-4eea-98bc-6c366c4d0c44/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/08d16afd-a996-44ed-aea5-90f975cf1ff9/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/06b77af8-67e5-4ea9-9c96-8beb94c49d21/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/301b52f1-1eb1-4963-b274-9643ffea5b09/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/623e7e5c-72e0-44f8-b520-5677db02e68c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/0b6b09ca-47cf-4786-b086-346722f4333c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/a6067214-77ac-4a76-a507-68afc553626e/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/9330e7ef-0a4c-4394-b992-ac1ee02aa7a1/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/04cb3767-763d-4ea9-a496-d77d3fd2396f/large.jpg"
              }
            ],
            "portfolio_url": "www.statestreetcolumbus.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16d1f7-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "782 Clifty Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 893,
            "id": 21,
            "property_uid": "10",
            "payee_account_number_token": "6b0ae391-da1a-49a6-bc66-b3a467afbb88",
            "posted_to_website_at": "2024-06-03T19:59:46.000Z",
            "contact_phone_number": "(812) 657-7969",
            "payee_routing_number": "083000564",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 3,
                "name": "state street apartments"
              },
              {
                "id": 4,
                "name": "state street apartments in"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": null,
            "address_address1": "782 Clifty Lane",
            "bedrooms": 1,
            "meta_description": null,
            "listable_uid": "a4189b9c-23f3-4f48-8340-569d3b263044",
            "portfolio_address2": "",
            "portfolio_address1": "782 Clifty Lane",
            "contact_email_address": "jperry.statestreet@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "Open floor plans, Island kitchens, Free strorage units",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 411,
            "portfolio_city": "Columbus",
            "appliances": "Refrigerator, Microwave, Washer and Dryer, Range",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-08-28T20:31:56.000Z",
            "marketing_title": "1 Bedroom",
            "unit_template_name": "State Street 1 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/7c967974-5311-466d-b07e-8dd85bc999a1/medium.jpg",
            "updated_at": "2024-12-26T18:04:41.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8844938,
            "property_type": "Multi-Family",
            "market_rent": 1135,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 657-7969",
            "virtual_showing": false,
            "posted_to_internet": 412,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2025-02-21",
            "portfolio_name": "State Street Apartments",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "782 Clifty Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.1894272",
                "longitude": "-85.8844938"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "a4189b9c-23f3-4f48-8340-569d3b263044"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=782+Clifty+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.1994272,-85.8844938",
            "address_latitude": 39.1894272,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/cf259e59-c949-487d-9296-d5413ee1df1c/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=9df40710-0b8a-43f7-a28a-4d61fb9eb5c3&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "782 Clifty Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/f78e0b2b-a5ac-46bb-9199-68e8b9c06b8d/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/76ce7f59-9bca-4139-ba60-8dad760f9d0c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/b2d55069-4a15-4333-9480-bb566d5a1e3d/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/a8164fdb-111c-4762-aeb3-52074598a68f/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d7e99f4c-a251-49b1-ae3f-721a1ae51700/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/fbadb78c-ed00-4e14-a217-483dcee88649/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/ab09809c-24d8-4571-9407-5dfa0de90d10/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/51aeec53-28dc-49a1-9a33-f0f39ccc97c9/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/48e1898c-c0bc-4c3a-b82b-8904b340dd0e/large.jpg"
              }
            ],
            "portfolio_url": "www.statestreetcolumbus.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16d57f-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "782 Clifty Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 1105,
            "id": 37,
            "property_uid": "10",
            "payee_account_number_token": "6b0ae391-da1a-49a6-bc66-b3a467afbb88",
            "posted_to_website_at": "2024-01-09T16:21:03.000Z",
            "contact_phone_number": "(812) 657-7969",
            "payee_routing_number": "083000564",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 3,
                "name": "state street apartments"
              },
              {
                "id": 4,
                "name": "state street apartments in"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": null,
            "address_address1": "782 Clifty Lane",
            "bedrooms": 2,
            "meta_description": null,
            "listable_uid": "9df40710-0b8a-43f7-a28a-4d61fb9eb5c3",
            "portfolio_address2": "",
            "portfolio_address1": "782 Clifty Lane",
            "contact_email_address": "jperry.statestreet@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "Open floor plans, Island kitchens, Free storage units",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 396,
            "portfolio_city": "Columbus",
            "appliances": "Range, Refrigerator, Microwave, Washer/Dryer",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-10-11T19:10:47.000Z",
            "marketing_title": "2 Bedroom ",
            "unit_template_name": "State Street 2 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/f78e0b2b-a5ac-46bb-9199-68e8b9c06b8d/medium.jpg",
            "updated_at": "2024-12-26T18:04:41.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8844938,
            "property_type": "Multi-Family",
            "market_rent": 1345,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 657-7969",
            "virtual_showing": false,
            "posted_to_internet": 409,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2024-12-26",
            "portfolio_name": "State Street Apartments",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "782 Clifty Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.1894272",
                "longitude": "-85.8844938"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "9df40710-0b8a-43f7-a28a-4d61fb9eb5c3"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=101+Reeveston+Drive+Macomb%2C+IL+61455&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.4693534,-90.6991406",
            "address_latitude": 40.4593534,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/6bf30e16-b146-4c7a-b867-84cdc5dd881f/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=8b197f43-c27a-4ebd-bb3b-28580806e713&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "61455",
            "full_address": "101 Reeveston Drive, Macomb, IL 61455",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/87cb0992-efae-45ff-af3f-c6b24f28b836/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/19464ca5-396a-43ca-9ddd-d67a9245e879/large.jpg"
              }
            ],
            "portfolio_url": "www.turnberrymacomb.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "4d16da9e-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "101 Reeveton Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              }
            },
            "square_feet": 807,
            "id": 45,
            "property_uid": "14",
            "payee_account_number_token": "c394d178-d9dd-4afb-93d7-7ab0cb814b40",
            "posted_to_website_at": "2024-10-04T15:54:13.000Z",
            "contact_phone_number": "(309) 836-3819",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 18,
                "name": "illinois"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              },
              {
                "id": 11,
                "name": "turnberry village macomb ii"
              },
              {
                "id": 12,
                "name": "turnberry village macomb ii group"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": "",
            "address_address1": "101 Reeveston Drive",
            "bedrooms": 1,
            "meta_description": null,
            "listable_uid": "8b197f43-c27a-4ebd-bb3b-28580806e713",
            "portfolio_address2": "",
            "portfolio_address1": "101 Reeveton Drive",
            "contact_email_address": "heather@turnberrymacomb.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 427,
            "portfolio_city": "Macomb",
            "appliances": "Dishwasher, Microwave, Washer and Dryer, Stove, Refrigerator",
            "by_the_bed": false,
            "address_state": "IL",
            "created_at": "2018-10-24T19:40:39.000Z",
            "marketing_title": "1 Bedroom - Turnberry II",
            "unit_template_name": "1 Bedroom Turnberry II ",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/87cb0992-efae-45ff-af3f-c6b24f28b836/medium.jpg",
            "updated_at": "2024-10-04T15:56:09.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -90.6991406,
            "property_type": "Multi-Family",
            "market_rent": 725,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(309) 836-3819",
            "virtual_showing": false,
            "posted_to_internet": 428,
            "database_name": "freemandevelopment",
            "address_postal_code": "61455",
            "address_country": "US",
            "available_date": "2025-08-15",
            "portfolio_name": "Turnberry Village Macomb II",
            "marketing_description": null,
            "address_city": "Macomb",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IL",
            "location": {
              "address": {
                "streetAddress": "101 Reeveston Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              },
              "geo": {
                "latitude": "40.4593534",
                "longitude": "-90.6991406"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "8b197f43-c27a-4ebd-bb3b-28580806e713"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=101+Reeveston+Drive+Macomb%2C+IL+61455&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.4693534,-90.6991406",
            "address_latitude": 40.4593534,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/6bf30e16-b146-4c7a-b867-84cdc5dd881f/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=6b457cba-6c03-4bac-97fc-4889f55cf85d&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "61455",
            "full_address": "101 Reeveston Drive, Macomb, IL 61455",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/db3666de-3d12-4aa1-a343-585f7c10c955/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6db00809-3d4e-413e-af43-a739d2ef0287/large.jpg"
              }
            ],
            "portfolio_url": "www.turnberrymacomb.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "4d16db39-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "101 Reeveton Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              }
            },
            "square_feet": 1056,
            "id": 46,
            "property_uid": "14",
            "payee_account_number_token": "c394d178-d9dd-4afb-93d7-7ab0cb814b40",
            "posted_to_website_at": "2024-10-04T15:54:56.000Z",
            "contact_phone_number": "(309) 836-3819",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 18,
                "name": "illinois"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              },
              {
                "id": 11,
                "name": "turnberry village macomb ii"
              },
              {
                "id": 12,
                "name": "turnberry village macomb ii group"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "101 Reeveston Drive",
            "bedrooms": 2,
            "meta_description": null,
            "listable_uid": "6b457cba-6c03-4bac-97fc-4889f55cf85d",
            "portfolio_address2": "",
            "portfolio_address1": "101 Reeveton Drive",
            "contact_email_address": "heather@turnberrymacomb.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 429,
            "portfolio_city": "Macomb",
            "appliances": "Microwave, Refrigerator, Stove, Washer and Dryer, Dishwasher",
            "by_the_bed": false,
            "address_state": "IL",
            "created_at": "2018-10-24T19:40:39.000Z",
            "marketing_title": "2 Bedroom - Turnberry II",
            "unit_template_name": "2 Bedroom Turnberry II",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/db3666de-3d12-4aa1-a343-585f7c10c955/medium.jpg",
            "updated_at": "2024-10-04T15:56:09.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -90.6991406,
            "property_type": "Multi-Family",
            "market_rent": 880,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(309) 836-3819",
            "virtual_showing": false,
            "posted_to_internet": 430,
            "database_name": "freemandevelopment",
            "address_postal_code": "61455",
            "address_country": "US",
            "available_date": "2025-08-15",
            "portfolio_name": "Turnberry Village Macomb II",
            "marketing_description": null,
            "address_city": "Macomb",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IL",
            "location": {
              "address": {
                "streetAddress": "101 Reeveston Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              },
              "geo": {
                "latitude": "40.4593534",
                "longitude": "-90.6991406"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "6b457cba-6c03-4bac-97fc-4889f55cf85d"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=201+Wigwam+Hollow+Road%2C+Macomb%2C+IL+61455&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.4702794,-90.6947452",
            "address_latitude": 40.4602794,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/6bf30e16-b146-4c7a-b867-84cdc5dd881f/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=31f0841f-b4d9-4838-8fa4-ce50417c1bc6&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "61455",
            "full_address": "201 Wigwam Hollow Road, #1201, Macomb, IL 61455",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/92e01e23-c539-47e0-bad4-89abcc1f7d6c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/e1fefe7f-a177-4f7f-a882-5be0f8c5e2a9/large.jpg"
              }
            ],
            "portfolio_url": "www.turnberrymacomb.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "4d16dc78-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "101 Reeveton Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              }
            },
            "square_feet": 1209,
            "id": 47,
            "property_uid": "12",
            "payee_account_number_token": "5c27fba5-6f9d-40a3-aced-d3d580ebd811",
            "posted_to_website_at": "2023-11-15T16:56:00.000Z",
            "contact_phone_number": "(309) 836-3819",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 18,
                "name": "illinois"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              },
              {
                "id": 11,
                "name": "turnberry village macomb ii"
              },
              {
                "id": 14,
                "name": "turnberry village macomb iii group"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "201 Wigwam Hollow Road, #1201",
            "bedrooms": 3,
            "meta_description": null,
            "listable_uid": "31f0841f-b4d9-4838-8fa4-ce50417c1bc6",
            "portfolio_address2": "",
            "portfolio_address1": "101 Reeveton Drive",
            "contact_email_address": "heather@turnberrymacomb.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 383,
            "portfolio_city": "Macomb",
            "appliances": "Washer and Dryer, Refrigerator, Microwave, Dishwasher",
            "by_the_bed": false,
            "address_state": "IL",
            "created_at": "2018-10-24T19:40:39.000Z",
            "marketing_title": "3 Bedroom ",
            "unit_template_name": "3 Bedroom - Turnberry III",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/92e01e23-c539-47e0-bad4-89abcc1f7d6c/medium.jpg",
            "updated_at": "2024-10-04T15:56:09.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -90.6947452,
            "property_type": "Multi-Family",
            "market_rent": 1050,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(309) 836-3819",
            "virtual_showing": false,
            "posted_to_internet": 384,
            "database_name": "freemandevelopment",
            "address_postal_code": "61455",
            "address_country": "US",
            "available_date": "2025-08-15",
            "portfolio_name": "Turnberry Village Macomb II",
            "marketing_description": null,
            "address_city": "Macomb",
            "property_year_built": 2007,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IL",
            "location": {
              "address": {
                "streetAddress": "201 Wigwam Hollow Road, #1201",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              },
              "geo": {
                "latitude": "40.4602794",
                "longitude": "-90.6947452"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "31f0841f-b4d9-4838-8fa4-ce50417c1bc6"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=201+Wigwam+Hollow+Road%2C+Macomb%2C+IL+61455&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.4702794,-90.6947452",
            "address_latitude": 40.4602794,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/6bf30e16-b146-4c7a-b867-84cdc5dd881f/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=4c328c08-7168-468c-baa3-9a10685d5bb5&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "61455",
            "full_address": "201 Wigwam Hollow Road, #1201, Macomb, IL 61455",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/4e3e2fdc-87d1-4c29-a33f-3547a4e3d3ba/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/f56a1c0a-6c32-40b8-9249-a18b523bcb10/large.jpg"
              }
            ],
            "portfolio_url": "www.turnberrymacomb.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "4d16dd14-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "101 Reeveton Drive",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              }
            },
            "square_feet": 1398,
            "id": 48,
            "property_uid": "12",
            "payee_account_number_token": "5c27fba5-6f9d-40a3-aced-d3d580ebd811",
            "posted_to_website_at": "2024-10-04T15:56:13.000Z",
            "contact_phone_number": "(309) 836-3819",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 18,
                "name": "illinois"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              },
              {
                "id": 11,
                "name": "turnberry village macomb ii"
              },
              {
                "id": 14,
                "name": "turnberry village macomb iii group"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "201 Wigwam Hollow Road, #1201",
            "bedrooms": 4,
            "meta_description": null,
            "listable_uid": "4c328c08-7168-468c-baa3-9a10685d5bb5",
            "portfolio_address2": "",
            "portfolio_address1": "101 Reeveton Drive",
            "contact_email_address": "heather@turnberrymacomb.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 431,
            "portfolio_city": "Macomb",
            "appliances": "Washer and Dryer, Refrigerator, Microwave, Stove, Dishwasher",
            "by_the_bed": false,
            "address_state": "IL",
            "created_at": "2018-10-24T19:40:39.000Z",
            "marketing_title": "4 Bedroom - Turnberry III",
            "unit_template_name": "4 Bedroom - Turnberry III",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/4e3e2fdc-87d1-4c29-a33f-3547a4e3d3ba/medium.jpg",
            "updated_at": "2024-10-04T16:06:06.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -90.6947452,
            "property_type": "Multi-Family",
            "market_rent": 1400,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(309) 836-3819",
            "virtual_showing": false,
            "posted_to_internet": 432,
            "database_name": "freemandevelopment",
            "address_postal_code": "61455",
            "address_country": "US",
            "available_date": "2025-08-15",
            "portfolio_name": "Turnberry Village Macomb II",
            "marketing_description": null,
            "address_city": "Macomb",
            "property_year_built": 2007,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IL",
            "location": {
              "address": {
                "streetAddress": "201 Wigwam Hollow Road, #1201",
                "city": "Macomb",
                "region": "IL",
                "postalCode": "61455",
                "country": "US"
              },
              "geo": {
                "latitude": "40.4602794",
                "longitude": "-90.6947452"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "4c328c08-7168-468c-baa3-9a10685d5bb5"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=420+Wint+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.2128968,-85.8857591",
            "address_latitude": 39.2028968,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/39488ff2-13c0-40dc-8e9e-4620b00d72bf/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=af819cc1-c972-436a-81a7-b0df6d4e783e&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "420 Wint Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3d07e448-2a30-4b0d-8274-cd52325b5f38/large.jpg"
              }
            ],
            "portfolio_url": "www.monarchcrossing.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16e2c5-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 820,
            "id": 63,
            "property_uid": "9",
            "payee_account_number_token": "7c60d321-7eb3-4cdf-8f02-62b681ec6d9d",
            "posted_to_website_at": "2024-08-08T15:40:05.000Z",
            "contact_phone_number": "(812) 372-8100",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 1,
                "name": "monarch"
              },
              {
                "id": 2,
                "name": "monarch crossing columbus"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": null,
            "address_address1": "420 Wint Lane",
            "bedrooms": 1,
            "meta_description": null,
            "listable_uid": "af819cc1-c972-436a-81a7-b0df6d4e783e",
            "portfolio_address2": "",
            "portfolio_address1": "420 Wint Lane",
            "contact_email_address": "statestreetcolumbus@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 420,
            "portfolio_city": "Columbus",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-12-28T16:30:28.000Z",
            "marketing_title": "The Emperor (1BR) ",
            "unit_template_name": "The Emperor - 1 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/3d07e448-2a30-4b0d-8274-cd52325b5f38/medium.jpg",
            "updated_at": "2024-12-26T18:04:41.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8857591,
            "property_type": "Multi-Family",
            "market_rent": 1225,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 372-8100",
            "virtual_showing": false,
            "posted_to_internet": 366,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2025-01-10",
            "portfolio_name": "Monarch Crossing Columbus",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.2028968",
                "longitude": "-85.8857591"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "af819cc1-c972-436a-81a7-b0df6d4e783e"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=420+Wint+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.2128968,-85.8857591",
            "address_latitude": 39.2028968,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/39488ff2-13c0-40dc-8e9e-4620b00d72bf/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=d2800215-81de-4c2d-b6ad-0481e81bc07d&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "420 Wint Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/e956916a-0c8f-444c-9e3c-2cecbd09df26/large.jpg"
              }
            ],
            "portfolio_url": "www.monarchcrossing.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16e0b5-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 1023,
            "id": 67,
            "property_uid": "9",
            "payee_account_number_token": "7c60d321-7eb3-4cdf-8f02-62b681ec6d9d",
            "posted_to_website_at": "2024-12-26T17:53:53.000Z",
            "contact_phone_number": "(812) 372-8100",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 1,
                "name": "monarch"
              },
              {
                "id": 2,
                "name": "monarch crossing columbus"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": null,
            "address_address1": "420 Wint Lane",
            "bedrooms": 3,
            "meta_description": null,
            "listable_uid": "d2800215-81de-4c2d-b6ad-0481e81bc07d",
            "portfolio_address2": "",
            "portfolio_address1": "420 Wint Lane",
            "contact_email_address": "statestreetcolumbus@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 445,
            "portfolio_city": "Columbus",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-12-28T16:30:28.000Z",
            "marketing_title": "The Juniper (3BR) ",
            "unit_template_name": "The Juniper - 3 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/e956916a-0c8f-444c-9e3c-2cecbd09df26/medium.jpg",
            "updated_at": "2024-12-26T18:04:41.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8857591,
            "property_type": "Multi-Family",
            "market_rent": 1350,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 372-8100",
            "virtual_showing": false,
            "posted_to_internet": 369,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2025-02-21",
            "portfolio_name": "Monarch Crossing Columbus",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.2028968",
                "longitude": "-85.8857591"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "d2800215-81de-4c2d-b6ad-0481e81bc07d"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=420+Wint+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.2128968,-85.8857591",
            "address_latitude": 39.2028968,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/39488ff2-13c0-40dc-8e9e-4620b00d72bf/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=f2647107-a295-4a8d-ba21-1fe2268a924a&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "420 Wint Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/c97e6a13-df3d-4089-a004-a377f8e4acf5/large.jpg"
              }
            ],
            "portfolio_url": "www.monarchcrossing.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16e57f-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 830,
            "id": 68,
            "property_uid": "9",
            "payee_account_number_token": "7c60d321-7eb3-4cdf-8f02-62b681ec6d9d",
            "posted_to_website_at": "2024-09-09T16:17:56.000Z",
            "contact_phone_number": "(812) 372-8100",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 1,
                "name": "monarch"
              },
              {
                "id": 2,
                "name": "monarch crossing columbus"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": null,
            "address_address1": "420 Wint Lane",
            "bedrooms": 1,
            "meta_description": null,
            "listable_uid": "f2647107-a295-4a8d-ba21-1fe2268a924a",
            "portfolio_address2": "",
            "portfolio_address1": "420 Wint Lane",
            "contact_email_address": "statestreetcolumbus@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 424,
            "portfolio_city": "Columbus",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-12-28T16:30:29.000Z",
            "marketing_title": "The Monarch (1BR) ",
            "unit_template_name": "The Monarch - 1 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/c97e6a13-df3d-4089-a004-a377f8e4acf5/medium.jpg",
            "updated_at": "2024-12-26T17:54:10.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8857591,
            "property_type": "Multi-Family",
            "market_rent": 1250,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 372-8100",
            "virtual_showing": false,
            "posted_to_internet": 370,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2024-12-26",
            "portfolio_name": "Monarch Crossing Columbus",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.2028968",
                "longitude": "-85.8857591"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "f2647107-a295-4a8d-ba21-1fe2268a924a"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=420+Wint+Lane+Columbus%2C+IN+47201&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=39.2128968,-85.8857591",
            "address_latitude": 39.2028968,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": "https://images.cdn.appfolio.com/freemandevelopment/images/39488ff2-13c0-40dc-8e9e-4620b00d72bf/large.jpg",
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=f0e37bb0-a21e-4096-b733-1bedfbed3801&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "47201",
            "full_address": "420 Wint Lane, Columbus, IN 47201",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/8e1039bf-d14a-405a-b783-df4011b5b756/large.jpg"
              }
            ],
            "portfolio_url": "www.monarchcrossing.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "4d16e61c-45a8-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              }
            },
            "square_feet": 1080,
            "id": 69,
            "property_uid": "9",
            "payee_account_number_token": "7c60d321-7eb3-4cdf-8f02-62b681ec6d9d",
            "posted_to_website_at": "2024-05-03T13:28:10.000Z",
            "contact_phone_number": "(812) 372-8100",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 1,
                "name": "monarch"
              },
              {
                "id": 2,
                "name": "monarch crossing columbus"
              },
              {
                "id": 15,
                "name": "tina&#39;s properties"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": null,
            "address_address1": "420 Wint Lane",
            "bedrooms": 2,
            "meta_description": null,
            "listable_uid": "f0e37bb0-a21e-4096-b733-1bedfbed3801",
            "portfolio_address2": "",
            "portfolio_address1": "420 Wint Lane",
            "contact_email_address": "statestreetcolumbus@gmail.com",
            "deposit": 500,
            "application_fee": 35,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 402,
            "portfolio_city": "Columbus",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2018-12-28T16:30:29.000Z",
            "marketing_title": "The Monarch (2BR) ",
            "unit_template_name": "The Monarch - 2 Bedroom",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/8e1039bf-d14a-405a-b783-df4011b5b756/medium.jpg",
            "updated_at": "2024-12-26T17:54:10.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -85.8857591,
            "property_type": "Multi-Family",
            "market_rent": 1400,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(812) 372-8100",
            "virtual_showing": false,
            "posted_to_internet": 371,
            "database_name": "freemandevelopment",
            "address_postal_code": "47201",
            "address_country": "US",
            "available_date": "2025-01-10",
            "portfolio_name": "Monarch Crossing Columbus",
            "marketing_description": null,
            "address_city": "Columbus",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "420 Wint Lane",
                "city": "Columbus",
                "region": "IN",
                "postalCode": "47201",
                "country": "US"
              },
              "geo": {
                "latitude": "39.2028968",
                "longitude": "-85.8857591"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "f0e37bb0-a21e-4096-b733-1bedfbed3801"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=de4a69c9-af41-4005-a766-be25d5cdcf82&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/37300ed4-c4f9-4424-8580-5ae9b9af7137/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/5676f072-dcfb-4bc6-98f7-cd7a49ce3c43/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d1f4dc3e-20f2-4823-8409-5d3008ae2c45/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d13204a0-7983-4b6f-be53-6ea101d9bd3c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/256fc27d-f532-4c2e-9215-d17dbb2208cd/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d6b6d4ea-62d3-45da-9f0b-7a7c67cb34d1/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6fdb19e5-a1cc-44cb-b0c9-699118e77aab/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/bd9f332b-cae5-4770-ab03-5fb93290d712/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/811967cd-3b54-4ed6-9eb4-dfc386bc9334/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/379e6e9e-4082-458a-9378-92db5eec1eef/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/87569715-b6f6-4ee1-845e-e8fdd1056a88/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/80164479-e632-4e2c-ab1b-6ffdf0bd9b15/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/cf52963d-ad66-4c85-aa4e-791a584f5807/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "82964234-4f94-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 817,
            "id": 142,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-03-23T14:01:51.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 1,
            "meta_description": "Starting at $1,345",
            "listable_uid": "de4a69c9-af41-4005-a766-be25d5cdcf82",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 288,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2021-01-20T19:03:04.000Z",
            "marketing_title": "Hancock - 1 Bedroom **2 Months Rent Free **$150 off of Advertised Rent, Move in by January 31st** ",
            "unit_template_name": "Hancock",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/37300ed4-c4f9-4424-8580-5ae9b9af7137/medium.jpg",
            "updated_at": "2025-01-02T21:24:09.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1295,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 339,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-06-17",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,345",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "de4a69c9-af41-4005-a766-be25d5cdcf82"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=4105406d-da17-4010-a784-e8a7209864ef&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/fbd30086-51e3-4471-8833-a2730dbcb84c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/1f3ef351-4e2b-4fb9-b8e6-b87ef2286e5c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/9b71c910-61be-4abe-a6a3-d84b64997c99/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/acf520c9-f320-48b7-81b1-404da041a7f7/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/bcb58045-6557-42be-b3a1-0a11ed173069/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/243c0b31-7e88-4907-945f-3f8d242753d4/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/f70c8569-5454-478e-9ccd-44260647963b/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/0eb94d06-7fec-4dca-b64b-444141f5c9fd/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/1a31934d-b6bf-447c-abc2-d7b2f52a1c26/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/9816ab53-cea9-4673-9f57-ef2b180c62bf/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3bc6cc1b-1c47-4f18-a803-68d526a298b3/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/5fedee7b-d729-4afd-b585-a33d38805dfa/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "1236f15c-4f95-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 1335,
            "id": 143,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-12-15T17:00:38.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 3,
            "meta_description": "Starting at $2,010",
            "listable_uid": "4105406d-da17-4010-a784-e8a7209864ef",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "karli@ctownmonon.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 392,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2021-01-20T19:03:04.000Z",
            "marketing_title": "Liberty - 3 Bedroom **2 Months Rent Free, **$100 off of Advertised Rent, Move in by January 31st**",
            "unit_template_name": "Liberty",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/fbd30086-51e3-4471-8833-a2730dbcb84c/medium.jpg",
            "updated_at": "2025-01-08T19:34:13.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 2010,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 338,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-11-01",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $2,010",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "4105406d-da17-4010-a784-e8a7209864ef"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=522e1414-2131-4f29-81fe-28a39c4ec219&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/30f819bd-c353-44f5-8e65-bb8a0801f8c0/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/7aaa467b-6193-476d-bd3d-452a9f1444d1/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/97a8d234-90d6-45b8-96d1-cbd51ac437bd/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/80ae2cea-990f-4525-85b0-072e18d097e4/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/69c6aafe-ed93-4f07-8f92-6bc0bf549559/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/229efea7-542d-4915-8181-71d6ab9f4734/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/4fed5dec-fbc7-4c05-be7c-24176567bc38/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/61f6ce22-fb60-422a-9bc5-92e91b229df2/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/5bf6bfa0-531f-4ca0-95b9-ed2507d131e6/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/dc6ca855-e6d0-4108-abef-d8ca2842f18b/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/03488849-9b41-4336-a19d-9bb4823d1b53/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/abe6d7b7-efd0-4286-90a0-a6dba740e214/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "ae73c3f0-4f94-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 1101,
            "id": 144,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-03-23T14:01:42.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 2,
            "meta_description": "Starting at $1,690\r\n",
            "listable_uid": "522e1414-2131-4f29-81fe-28a39c4ec219",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 284,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2021-01-20T19:03:04.000Z",
            "marketing_title": "Madison - 2 Bedroom",
            "unit_template_name": "Madison",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/30f819bd-c353-44f5-8e65-bb8a0801f8c0/medium.jpg",
            "updated_at": "2024-12-24T13:34:25.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1690,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 337,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2025-04-15",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,690<br/>",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "522e1414-2131-4f29-81fe-28a39c4ec219"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=62db73a7-a59e-41af-842a-1bb1b2145a6c&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/b55fdbcb-5841-4646-ad3c-195fde732cfa/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/a7e97a59-5516-4dec-8a37-b82d17898e5a/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d1d0e345-b21a-483d-96fc-0df454e5a94f/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/d2a5c84b-a2e7-4e0a-bf0e-58d0e9c517a6/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6d71c06a-48cb-45b6-b6e5-c21b4e23d85a/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/bde85b08-ea99-4a07-a2c8-626c5d542c80/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/83caaa8d-fe10-457d-b602-2066c9bab1fb/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/64b3b87a-fc61-4bb7-b1ac-57b0a3b5face/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/2a177209-4a3c-4c8b-b9e7-ae4e6afb89a3/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/7c91edf5-bd0a-4bfb-b0b8-cf6e33990625/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/27d5ce30-2389-4bd3-9ce6-db5b82140679/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6d7df106-d7e4-4ac1-a436-1e5b218081af/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "d9dc0602-4f94-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 1130,
            "id": 145,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-03-23T14:01:38.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 2,
            "meta_description": "Starting at $1,640",
            "listable_uid": "62db73a7-a59e-41af-842a-1bb1b2145a6c",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 282,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2021-01-20T19:03:04.000Z",
            "marketing_title": "Monroe - 2 Bedroom **2 Months Rent Free, **$100 off of Advertised Rent, Move in by January 31st**",
            "unit_template_name": "Monroe",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/b55fdbcb-5841-4646-ad3c-195fde732cfa/medium.jpg",
            "updated_at": "2025-01-02T21:24:09.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1640,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 336,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-11-15",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,640",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "62db73a7-a59e-41af-842a-1bb1b2145a6c"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=a1e3a8e3-fe57-46a1-8aab-f9791cc0a9f9&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/f5032de0-6309-4a80-94cd-92ed2f265416/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/e62e88fd-bc2a-47d2-b944-41658f71385d/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/bf3a2971-885f-4e0b-b383-492b95a3d8bd/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/5088623d-f440-437e-af81-dadbd1091054/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/b381024d-1907-4d58-bfc9-65f7c055fe45/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/9a70d120-b100-44a2-b3e6-d14576992ba9/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/7498bb86-460f-4c1e-97ca-3f0111db2f08/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3b103bd0-d881-476b-9c30-456931aee465/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/9ca28bef-eb26-4e63-ae62-6e5caa436a29/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/71727047-3153-47df-b5ca-3998995d5080/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/0c0fd8eb-938e-4c59-8fa2-2d42237a0626/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/426adb8b-cb9e-4303-a203-a848ef1a0c63/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Dogs allowed",
            "unit_template_uuid": "55445dea-4f94-11eb-9911-02377326b003",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 800,
            "id": 146,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-03-23T14:01:32.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 1,
            "meta_description": "Starting at $1,325/month ",
            "listable_uid": "a1e3a8e3-fe57-46a1-8aab-f9791cc0a9f9",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 280,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2021-01-20T19:03:04.000Z",
            "marketing_title": "Revere - 1 Bedroom**2 Months Rent Free **$100 off of Advertised Rent, Move in by January 31st** ",
            "unit_template_name": "Revere",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/f5032de0-6309-4a80-94cd-92ed2f265416/medium.jpg",
            "updated_at": "2025-01-02T21:14:16.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1325,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 335,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-09-16",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,325/month ",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Cats allowed",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "a1e3a8e3-fe57-46a1-8aab-f9791cc0a9f9"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=1bba16c9-68eb-4eaa-8bfc-0837b2aecd84&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/cfd8936e-aa1b-4f73-ac6d-0498f0e70efe/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/5f119676-1f00-46dc-8995-30a2650b9301/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/ecd589eb-4b98-479b-a5c9-2f1a43cdb30c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/f79d1408-8566-4d5e-8b5a-73396600a867/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/ef4e03db-e09b-4c34-8f37-9fb51d5c8d59/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/14561f9d-1788-497d-9971-cd40f710e86f/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3e006006-7e09-4b33-b1c8-7d39cad5ef81/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/a16d2c0f-7e91-4202-b560-b8d0c232f1ee/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/22610431-f914-4d79-b16d-5384d4ef3d4c/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/a6ad6e2e-53cd-49a3-8973-d079ca08214f/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3d91d92f-033b-45a6-8727-e8a6bf829a0a/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/811d20c9-f685-49c6-9880-f61d8515f69f/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "d4587321-09ef-11ed-ae82-0285f53d941c",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 826,
            "id": 171,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-12-01T20:43:52.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 1,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 1,
            "meta_description": "Starting at $1,460",
            "listable_uid": "1bba16c9-68eb-4eaa-8bfc-0837b2aecd84",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 389,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2023-02-09T17:25:03.000Z",
            "marketing_title": "Franklin - 1 Bedroom**2 Months Rent Free, Move in by January 31st**",
            "unit_template_name": "Franklin",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/cfd8936e-aa1b-4f73-ac6d-0498f0e70efe/medium.jpg",
            "updated_at": "2025-01-02T21:14:16.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1460,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 390,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-10-15",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,460",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "1bba16c9-68eb-4eaa-8bfc-0837b2aecd84"
        },
        {
          "data": {
            "google_map_url": "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=18300+Wheeler+Road+Westfield%2C+IN+46074&amp;ie=UTF8&amp;z=14&amp;output=embed&amp;iwloc=A&amp;ll=40.0652801,-86.1460401",
            "address_latitude": 40.0552801,
            "database_url": "https://freemandevelopment.appfolio.com/",
            "allow_guest_cards": true,
            "logo_url": null,
            "rental_application_url": "https://freemandevelopment.appfolio.com/listings/rental_applications/new?listable_uid=2824a219-dbf0-4ce2-982c-59c44b3fdacb&source=Website",
            "available": true,
            "advertised_lease_term": null,
            "portfolio_postal_code": "46074",
            "full_address": "18300 Wheeler Road, Westfield, IN 46074",
            "utilities": "",
            "photos": [
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/3031a070-b9ea-428c-81c0-d74b5fff7d72/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/2cdb0913-514d-4c1a-9cfd-87f66f71eccc/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/15fa4748-e2ed-456c-9ac5-b9d74292a7f0/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/e67d7739-4978-4607-824d-2a313e5fbd71/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/2cb9a649-acc1-4c6e-8009-caf67f6a154b/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6ef43de5-932f-4c6c-8154-26a3e482180e/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/0d2106d5-928a-44da-b482-22555279ebdc/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/6faa0f96-66e9-4d42-a37d-3dce45ef2e35/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/0701076c-18d4-4014-87eb-9c8494694ab5/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/293f8661-dbd5-4370-92ec-62826f9191b2/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/94d05fc7-393c-4f3c-ac30-9f31ec80db46/large.jpg"
              },
              {
                "url": "https://images.cdn.appfolio.com/freemandevelopment/images/86f21a84-2f6a-48e2-8817-9bfd5748bc28/large.jpg"
              }
            ],
            "portfolio_url": "www.ctownmonon.com",
            "dogs": "Not Specified",
            "unit_template_uuid": "3aa3c4e5-09f0-11ed-ae82-0285f53d941c",
            "portfolio_location": {
              "address": {
                "streetAddress": "960 Charlestown Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              }
            },
            "square_feet": 1034,
            "id": 172,
            "property_uid": "18",
            "payee_account_number_token": "2a0fbd90-f4c5-41a7-a1c5-2ecd920ac090",
            "posted_to_website_at": "2023-08-11T17:56:02.000Z",
            "contact_phone_number": "(317) 804-2529",
            "payee_routing_number": "274970791",
            "revenue_management_property": false,
            "property_lists": [
              {
                "id": 20,
                "name": "charlestown on the monon"
              },
              {
                "id": 21,
                "name": "charlestown on the monon apartments"
              }
            ],
            "youtube_video_url": null,
            "rent_or_starting_at": "RENT",
            "bathrooms": 2,
            "address_address2": "",
            "address_address1": "18300 Wheeler Road",
            "bedrooms": 2,
            "meta_description": "Starting at $1,570",
            "listable_uid": "2824a219-dbf0-4ce2-982c-59c44b3fdacb",
            "portfolio_address2": "",
            "portfolio_address1": "960 Charlestown Road",
            "contact_email_address": "Julie@freemandevelopment.com",
            "deposit": 500,
            "application_fee": 50,
            "admin_fee_payee_account_number_token": null,
            "allow_submitting_online_applications": true,
            "amenities": "",
            "admin_fee_payee_routing_number": null,
            "move_in_prices": null,
            "admin_fee": null,
            "posted_to_website": 333,
            "portfolio_city": "Westfield",
            "appliances": "",
            "by_the_bed": false,
            "address_state": "IN",
            "created_at": "2023-02-09T17:25:03.000Z",
            "marketing_title": "Jefferson - 2 Bedroom**2 Months Rent Free **$100 off of Advertised Rent, Move in by January 31st** ",
            "unit_template_name": "Jefferson",
            "pre_leasing_term_id": null,
            "default_photo_thumbnail_url": "https://images.cdn.appfolio.com/freemandevelopment/images/3031a070-b9ea-428c-81c0-d74b5fff7d72/medium.jpg",
            "updated_at": "2025-01-02T21:14:16.000Z",
            "fee_label": "Application Fee",
            "address_longitude": -86.1460401,
            "property_type": "Multi-Family",
            "market_rent": 1570,
            "customization_uuid": null,
            "affordable": false,
            "portfolio_phone_number": "(317) 804-2529",
            "virtual_showing": false,
            "posted_to_internet": 340,
            "database_name": "freemandevelopment",
            "address_postal_code": "46074",
            "address_country": "US",
            "available_date": "2024-10-15",
            "portfolio_name": "Charlestown on the Monon Apartments",
            "marketing_description": "Starting at $1,570",
            "address_city": "Westfield",
            "property_year_built": null,
            "room_template_id": null,
            "rent_range": null,
            "bedroom_type": null,
            "portfolio_country": "US",
            "cats": "Not Specified",
            "youtube_video_id": null,
            "portfolio_state": "IN",
            "location": {
              "address": {
                "streetAddress": "18300 Wheeler Road",
                "city": "Westfield",
                "region": "IN",
                "postalCode": "46074",
                "country": "US"
              },
              "geo": {
                "latitude": "40.0552801",
                "longitude": "-86.1460401"
              }
            },
            "schedule_showing_url": null
          },
          "page_item_url": "2824a219-dbf0-4ce2-982c-59c44b3fdacb"
        }
      ]
);
  
  console.log(JSON.stringify(transformedData, null, 2));