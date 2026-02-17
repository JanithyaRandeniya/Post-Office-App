import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Air Mail/Registered countries data
const airMailCountries = [
  { 
    name: "Afghanistan", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsGjzvVcTh3RX3NmqjUpU3DplP5j4NJ7RRws8q2w49vBgs1WV7UOCdbjF3_pMu7Ly4U-GYX5NEfAtlbTdSrUJ53O5SgQSxXSITivQ467OAW7Vqsw6O1PFfZ8zJKYKVrcZBGHXbE34GX2OMwWeyTDaQqROfo9D4xagB7O1-Fd5BtPXE0dL8CaXYoZoA4gCcX7rC0yeqjQEzKefIu61UnYzGcHKFYw4r8v8w_zeLxG8g-eb51kB_XRC-79v0pNLE8z4GLA_mChy6OQ",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 150" },
        { weight: "Up to 50g", rate: "LKR 280" },
        { weight: "Up to 100g", rate: "LKR 450" },
        { weight: "Up to 250g", rate: "LKR 850" }
      ],
      registration: "LKR 200",
      deliveryTime: "10-15 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "Australia", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGS9_OuR0tGYuVlccBBk-1Z1yVFGHug0pn6f62BrJzRk5FFTBd1SBhbJOLpdhmumI3l4cvSPfvhZrH7B44JjG-5TxpSkekvuEn31KtYjs5l8zC7Ks9OzyS6YjuKnMCrjZRKg4jJfYgAyH0DeGtahguSdY_OGTIneybr2rfnii9UeLU8q4uxPP-RR1auASwyeJPR4aT3JOMYfl-rcl6pfDaDNvG2oHaFH5OT9DNYNtR5fmofnvb5PMqqEnH4M8u3OobsL39mwficCM",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 120" },
        { weight: "Up to 50g", rate: "LKR 220" },
        { weight: "Up to 100g", rate: "LKR 380" },
        { weight: "Up to 250g", rate: "LKR 720" }
      ],
      registration: "LKR 180",
      deliveryTime: "7-10 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "United States", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5BeLzOdoNvNltc2DvFGxYYOHaDF_m_XRnJ7mdwFl2UjQF1kfVh47u5KbtnArffcZ9UkIh2LcdmBZt9BLX7N0S9N0rbbXrb8V9Ok654x6htPSt-TOxe4jcuQbVqomkCntLdLz_JT7vfJGOv-1X6_CO08mAI-3ijR88sZMQIcIZNOj0f-_7q3NpHJK9brXamOLdptq2o6ewEMBvJre7dP_iOQVjWDJ3yWPej4jqZJJcCGbBKYHg4Zjd9yTjiZ9Nfq3LqJ1JW6Y3fI",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 130" },
        { weight: "Up to 50g", rate: "LKR 240" },
        { weight: "Up to 100g", rate: "LKR 420" },
        { weight: "Up to 250g", rate: "LKR 780" }
      ],
      registration: "LKR 190",
      deliveryTime: "8-12 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "Canada", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsUCgy1eh3BCT-F6rRaeBt18s6SuamTxbzhPlkRZo5B_Dj5M5ZPe02nv28w-SZLdXgPrTOv3WCs5g5XcJ1IyE8iDK8ngNKkWjs6jJhkNIqrOmQBeTuXDGsByxYVhBrBx9z5PaO02tzaMjwpZBDKuj-CirzgffDn_v5YBodMxahHZMujHL3tzWlvx8fUGuDbYnmi1Ukdy3fxp5wnV2CyetNp_YQUWWhFRZKRw336jeo3rbenAb3vl6xpa0N0nRZa2rXpzAdtmYI4oQ",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 125" },
        { weight: "Up to 50g", rate: "LKR 230" },
        { weight: "Up to 100g", rate: "LKR 400" },
        { weight: "Up to 250g", rate: "LKR 750" }
      ],
      registration: "LKR 185",
      deliveryTime: "9-13 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "Germany", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgwtJBYdbl2PAHGe0T6ZwCS-zomsGHLDrckrgVtfbs4PMRtQ2bLxYhpkY1zij94duE59elhiJ6CpaNFBBENpZRCsaeFfbnJoilofiUcnMvA5DPHeLFPfIXja5hdLWhkMw1fBfWQ7PswVMr0y1_dJVCC3bBZ7t-hu0ZYufnQBXp5geAhR7QqHgz9-c9xGPBwopf0Qg4B5ZkDbAWHOrbo_CNSSYJ0THQGzv3TsA6h8kRHuXMcPp5ULqY3KO7AJ_ukp5Q4kgaoV0N7MA",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 110" },
        { weight: "Up to 50g", rate: "LKR 200" },
        { weight: "Up to 100g", rate: "LKR 350" },
        { weight: "Up to 250g", rate: "LKR 680" }
      ],
      registration: "LKR 170",
      deliveryTime: "6-9 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "India", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT9Cq5fzsET1ZxTlMM_Znz0wblgHIWKQf_w82j3rhOuF-zLCGtufLY2OfZBTciYOgUfEXUcJ9OHWSjvCqjvY6oSXvUPsRO-JuqTs403Oe0HlsFN9QdiEIIewp8wzg0PxGrm-lwSgWvnEY0ZJzvmvyYb0p_v9Tt708RqE0HeM6KqXaWo4TrmGe9mFdQdH9Z-5s6GxJxMIMXMyJdkIeBnXAp2rwykZWzY89C1l5XzGenNZU5qC3jdAQKJpDC-aj8rr3OFAcWbfK38SE",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 80" },
        { weight: "Up to 50g", rate: "LKR 150" },
        { weight: "Up to 100g", rate: "LKR 250" },
        { weight: "Up to 250g", rate: "LKR 480" }
      ],
      registration: "LKR 120",
      deliveryTime: "3-5 days",
      maxWeight: "2kg"
    }
  },
  { 
    name: "United Kingdom", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsGjzvVcTh3RX3NmqjUpU3DplP5j4NJ7RRws8q2w49vBgs1WV7UOCdbjF3_pMu7Ly4U-GYX5NEfAtlbTdSrUJ53O5SgQSxXSITivQ467OAW7Vqsw6O1PFfZ8zJKYKVrcZBGHXbE34GX2OMwWeyTDaQqROfo9D4xagB7O1-Fd5BtPXE0dL8CaXYoZoA4gCcX7rC0yeqjQEzKefIu61UnYzGcHKFYw4r8v8w_zeLxG8g-eb51kB_XRC-79v0pNLE8z4GLA_mChy6OQ",
    rates: {
      letters: [
        { weight: "Up to 20g", rate: "LKR 100" },
        { weight: "Up to 50g", rate: "LKR 180" },
        { weight: "Up to 100g", rate: "LKR 320" },
        { weight: "Up to 250g", rate: "LKR 620" }
      ],
      registration: "LKR 160",
      deliveryTime: "5-8 days",
      maxWeight: "2kg"
    }
  }
];

// EMS (Speed Post) countries data
const emsCountries = [
  { 
    name: "Argentina", 
    flag: "https://flagcdn.com/w320/ar.png",
    rates: {
      baseRate: "LKR 2,500",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 3,200" },
        { weight: "Up to 1kg", rate: "LKR 4,500" },
        { weight: "Up to 2kg", rate: "LKR 6,800" },
        { weight: "Each additional 500g", rate: "LKR 1,200" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "5-7 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "Australia", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGS9_OuR0tGYuVlccBBk-1Z1yVFGHug0pn6f62BrJzRk5FFTBd1SBhbJOLpdhmumI3l4cvSPfvhZrH7B44JjG-5TxpSkekvuEn31KtYjs5l8zC7Ks9OzyS6YjuKnMCrjZRKg4jJfYgAyH0DeGtahguSdY_OGTIneybr2rfnii9UeLU8q4uxPP-RR1auASwyeJPR4aT3JOMYfl-rcl6pfDaDNvG2oHaFH5OT9DNYNtR5fmofnvb5PMqqEnH4M8u3OobsL39mwficCM",
    rates: {
      baseRate: "LKR 2,200",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 2,800" },
        { weight: "Up to 1kg", rate: "LKR 3,900" },
        { weight: "Up to 2kg", rate: "LKR 5,800" },
        { weight: "Each additional 500g", rate: "LKR 1,000" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "3-5 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "United States", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5BeLzOdoNvNltc2DvFGxYYOHaDF_m_XRnJ7mdwFl2UjQF1kfVh47u5KbtnArffcZ9UkIh2LcdmBZt9BLX7N0S9N0rbbXrb8V9Ok654x6htPSt-TOxe4jcuQbVqomkCntLdLz_JT7vfJGOv-1X6_CO08mAI-3ijR88sZMQIcIZNOj0f-_7q3NpHJK9brXamOLdptq2o6ewEMBvJre7dP_iOQVjWDJ3yWPej4jqZJJcCGbBKYHg4Zjd9yTjiZ9Nfq3LqJ1JW6Y3fI",
    rates: {
      baseRate: "LKR 2,300",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 3,000" },
        { weight: "Up to 1kg", rate: "LKR 4,200" },
        { weight: "Up to 2kg", rate: "LKR 6,200" },
        { weight: "Each additional 500g", rate: "LKR 1,100" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "4-6 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "Canada", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsUCgy1eh3BCT-F6rRaeBt18s6SuamTxbzhPlkRZo5B_Dj5M5ZPe02nv28w-SZLdXgPrTOv3WCs5g5XcJ1IyE8iDK8ngNKkWjs6jJhkNIqrOmQBeTuXDGsByxYVhBrBx9z5PaO02tzaMjwpZBDKuj-CirzgffDn_v5YBodMxahHZMujHL3tzWlvx8fUGuDbYnmi1Ukdy3fxp5wnV2CyetNp_YQUWWhFRZKRw336jeo3rbenAb3vl6xpa0N0nRZa2rXpzAdtmYI4oQ",
    rates: {
      baseRate: "LKR 2,400",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 3,100" },
        { weight: "Up to 1kg", rate: "LKR 4,300" },
        { weight: "Up to 2kg", rate: "LKR 6,400" },
        { weight: "Each additional 500g", rate: "LKR 1,150" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "4-7 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "Germany", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgwtJBYdbl2PAHGe0T6ZwCS-zomsGHLDrckrgVtfbs4PMRtQ2bLxYhpkY1zij94duE59elhiJ6CpaNFBBENpZRCsaeFfbnJoilofiUcnMvA5DPHeLFPfIXja5hdLWhkMw1fBfWQ7PswVMr0y1_dJVCC3bBZ7t-hu0ZYufnQBXp5geAhR7QqHgz9-c9xGPBwopf0Qg4B5ZkDbAWHOrbo_CNSSYJ0THQGzv3TsA6h8kRHuXMcPp5ULqY3KO7AJ_ukp5Q4kgaoV0N7MA",
    rates: {
      baseRate: "LKR 2,100",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 2,700" },
        { weight: "Up to 1kg", rate: "LKR 3,800" },
        { weight: "Up to 2kg", rate: "LKR 5,600" },
        { weight: "Each additional 500g", rate: "LKR 950" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "3-5 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "India", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT9Cq5fzsET1ZxTlMM_Znz0wblgHIWKQf_w82j3rhOuF-zLCGtufLY2OfZBTciYOgUfEXUcJ9OHWSjvCqjvY6oSXvUPsRO-JuqTs403Oe0HlsFN9QdiEIIewp8wzg0PxGrm-lwSgWvnEY0ZJzvmvyYb0p_v9Tt708RqE0HeM6KqXaWo4TrmGe9mFdQdH9Z-5s6GxJxMIMXMyJdkIeBnXAp2rwykZWzY89C1l5XzGenNZU5qC3jdAQKJpDC-aj8rr3OFAcWbfK38SE",
    rates: {
      baseRate: "LKR 1,500",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 1,900" },
        { weight: "Up to 1kg", rate: "LKR 2,600" },
        { weight: "Up to 2kg", rate: "LKR 3,800" },
        { weight: "Each additional 500g", rate: "LKR 600" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "2-4 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "United Kingdom", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsGjzvVcTh3RX3NmqjUpU3DplP5j4NJ7RRws8q2w49vBgs1WV7UOCdbjF3_pMu7Ly4U-GYX5NEfAtlbTdSrUJ53O5SgQSxXSITivQ467OAW7Vqsw6O1PFfZ8zJKYKVrcZBGHXbE34GX2OMwWeyTDaQqROfo9D4xagB7O1-Fd5BtPXE0dL8CaXYoZoA4gCcX7rC0yeqjQEzKefIu61UnYzGcHKFYw4r8v8w_zeLxG8g-eb51kB_XRC-79v0pNLE8z4GLA_mChy6OQ",
    rates: {
      baseRate: "LKR 2,000",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 2,500" },
        { weight: "Up to 1kg", rate: "LKR 3,500" },
        { weight: "Up to 2kg", rate: "LKR 5,200" },
        { weight: "Each additional 500g", rate: "LKR 850" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "3-5 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "Japan", 
    flag: "https://flagcdn.com/w320/jp.png",
    rates: {
      baseRate: "LKR 2,300",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 2,900" },
        { weight: "Up to 1kg", rate: "LKR 4,000" },
        { weight: "Up to 2kg", rate: "LKR 5,900" },
        { weight: "Each additional 500g", rate: "LKR 1,000" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "3-5 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  },
  { 
    name: "Singapore", 
    flag: "https://flagcdn.com/w320/sg.png",
    rates: {
      baseRate: "LKR 1,800",
      weightRates: [
        { weight: "Up to 500g", rate: "LKR 2,200" },
        { weight: "Up to 1kg", rate: "LKR 3,000" },
        { weight: "Up to 2kg", rate: "LKR 4,400" },
        { weight: "Each additional 500g", rate: "LKR 700" }
      ],
      insurance: "1% of declared value",
      deliveryTime: "2-3 days",
      maxWeight: "30kg",
      tracking: "Included",
      signature: "Required"
    }
  }
];

// SAL Parcel countries data
const salParcelCountries = [
  { 
    name: "Australia", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGS9_OuR0tGYuVlccBBk-1Z1yVFGHug0pn6f62BrJzRk5FFTBd1SBhbJOLpdhmumI3l4cvSPfvhZrH7B44JjG-5TxpSkekvuEn31KtYjs5l8zC7Ks9OzyS6YjuKnMCrjZRKg4jJfYgAyH0DeGtahguSdY_OGTIneybr2rfnii9UeLU8q4uxPP-RR1auASwyeJPR4aT3JOMYfl-rcl6pfDaDNvG2oHaFH5OT9DNYNtR5fmofnvb5PMqqEnH4M8u3OobsL39mwficCM",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,800" },
        { weight: "Up to 2kg", rate: "LKR 2,800" },
        { weight: "Up to 5kg", rate: "LKR 5,500" },
        { weight: "Up to 10kg", rate: "LKR 9,800" },
        { weight: "Each additional kg", rate: "LKR 850" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "15-25 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Canada", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsUCgy1eh3BCT-F6rRaeBt18s6SuamTxbzhPlkRZo5B_Dj5M5ZPe02nv28w-SZLdXgPrTOv3WCs5g5XcJ1IyE8iDK8ngNKkWjs6jJhkNIqrOmQBeTuXDGsByxYVhBrBx9z5PaO02tzaMjwpZBDKuj-CirzgffDn_v5YBodMxahHZMujHL3tzWlvx8fUGuDbYnmi1Ukdy3fxp5wnV2CyetNp_YQUWWhFRZKRw336jeo3rbenAb3vl6xpa0N0nRZa2rXpzAdtmYI4oQ",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,900" },
        { weight: "Up to 2kg", rate: "LKR 3,000" },
        { weight: "Up to 5kg", rate: "LKR 5,800" },
        { weight: "Up to 10kg", rate: "LKR 10,200" },
        { weight: "Each additional kg", rate: "LKR 900" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "18-28 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "China", 
    flag: "https://flagcdn.com/w320/cn.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,500" },
        { weight: "Up to 2kg", rate: "LKR 2,400" },
        { weight: "Up to 5kg", rate: "LKR 4,500" },
        { weight: "Up to 10kg", rate: "LKR 8,000" },
        { weight: "Each additional kg", rate: "LKR 700" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "12-20 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "France", 
    flag: "https://flagcdn.com/w320/fr.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,700" },
        { weight: "Up to 2kg", rate: "LKR 2,600" },
        { weight: "Up to 5kg", rate: "LKR 5,000" },
        { weight: "Up to 10kg", rate: "LKR 8,800" },
        { weight: "Each additional kg", rate: "LKR 780" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "16-24 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Germany", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgwtJBYdbl2PAHGe0T6ZwCS-zomsGHLDrckrgVtfbs4PMRtQ2bLxYhpkY1zij94duE59elhiJ6CpaNFBBENpZRCsaeFfbnJoilofiUcnMvA5DPHeLFPfIXja5hdLWhkMw1fBfWQ7PswVMr0y1_dJVCC3bBZ7t-hu0ZYufnQBXp5geAhR7QqHgz9-c9xGPBwopf0Qg4B5ZkDbAWHOrbo_CNSSYJ0THQGzv3TsA6h8kRHuXMcPp5ULqY3KO7AJ_ukp5Q4kgaoV0N7MA",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,750" },
        { weight: "Up to 2kg", rate: "LKR 2,700" },
        { weight: "Up to 5kg", rate: "LKR 5,200" },
        { weight: "Up to 10kg", rate: "LKR 9,100" },
        { weight: "Each additional kg", rate: "LKR 800" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "15-23 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Great Britain", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsGjzvVcTh3RX3NmqjUpU3DplP5j4NJ7RRws8q2w49vBgs1WV7UOCdbjF3_pMu7Ly4U-GYX5NEfAtlbTdSrUJ53O5SgQSxXSITivQ467OAW7Vqsw6O1PFfZ8zJKYKVrcZBGHXbE34GX2OMwWeyTDaQqROfo9D4xagB7O1-Fd5BtPXE0dL8CaXYoZoA4gCcX7rC0yeqjQEzKefIu61UnYzGcHKFYw4r8v8w_zeLxG8g-eb51kB_XRC-79v0pNLE8z4GLA_mChy6OQ",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,650" },
        { weight: "Up to 2kg", rate: "LKR 2,500" },
        { weight: "Up to 5kg", rate: "LKR 4,800" },
        { weight: "Up to 10kg", rate: "LKR 8,500" },
        { weight: "Each additional kg", rate: "LKR 750" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "14-22 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Japan", 
    flag: "https://flagcdn.com/w320/jp.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,600" },
        { weight: "Up to 2kg", rate: "LKR 2,450" },
        { weight: "Up to 5kg", rate: "LKR 4,600" },
        { weight: "Up to 10kg", rate: "LKR 8,200" },
        { weight: "Each additional kg", rate: "LKR 720" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "10-18 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Korea South", 
    flag: "https://flagcdn.com/w320/kr.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,550" },
        { weight: "Up to 2kg", rate: "LKR 2,350" },
        { weight: "Up to 5kg", rate: "LKR 4,400" },
        { weight: "Up to 10kg", rate: "LKR 7,800" },
        { weight: "Each additional kg", rate: "LKR 680" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "11-19 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Malaysia", 
    flag: "https://flagcdn.com/w320/my.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,400" },
        { weight: "Up to 2kg", rate: "LKR 2,100" },
        { weight: "Up to 5kg", rate: "LKR 3,900" },
        { weight: "Up to 10kg", rate: "LKR 6,800" },
        { weight: "Each additional kg", rate: "LKR 600" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "8-15 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Singapore", 
    flag: "https://flagcdn.com/w320/sg.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,350" },
        { weight: "Up to 2kg", rate: "LKR 2,000" },
        { weight: "Up to 5kg", rate: "LKR 3,700" },
        { weight: "Up to 10kg", rate: "LKR 6,500" },
        { weight: "Each additional kg", rate: "LKR 580" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "7-14 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "Thailand", 
    flag: "https://flagcdn.com/w320/th.png",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 1,300" },
        { weight: "Up to 2kg", rate: "LKR 1,900" },
        { weight: "Up to 5kg", rate: "LKR 3,500" },
        { weight: "Up to 10kg", rate: "LKR 6,200" },
        { weight: "Each additional kg", rate: "LKR 550" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "9-16 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  },
  { 
    name: "USA", 
    flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5BeLzOdoNvNltc2DvFGxYYOHaDF_m_XRnJ7mdwFl2UjQF1kfVh47u5KbtnArffcZ9UkIh2LcdmBZt9BLX7N0S9N0rbbXrb8V9Ok654x6htPSt-TOxe4jcuQbVqomkCntLdLz_JT7vfJGOv-1X6_CO08mAI-3ijR88sZMQIcIZNOj0f-_7q3NpHJK9brXamOLdptq2o6ewEMBvJre7dP_iOQVjWDJ3yWPej4jqZJJcCGbBKYHg4Zjd9yTjiZ9Nfq3LqJ1JW6Y3fI",
    rates: {
      description: "Surface Air Lifted - Combined transport method",
      weightRates: [
        { weight: "Up to 1kg", rate: "LKR 2,000" },
        { weight: "Up to 2kg", rate: "LKR 3,100" },
        { weight: "Up to 5kg", rate: "LKR 6,000" },
        { weight: "Up to 10kg", rate: "LKR 10,500" },
        { weight: "Each additional kg", rate: "LKR 950" }
      ],
      insurance: "Optional - 1% of declared value",
      deliveryTime: "20-30 days",
      maxWeight: "20kg",
      tracking: "Limited",
      signature: "Optional",
      features: [
        "Cost-effective option",
        "Combined sea and air transport",
        "Suitable for non-urgent parcels"
      ]
    }
  }
];

const PostalRates: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Air Mail/Registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  // Get current countries list based on active tab
  const getCurrentCountries = () => {
    switch (activeTab) {
      case "Air Mail/Registered":
        return airMailCountries;
      case "EMS (Speed Post)":
        return emsCountries;
      case "SAL Parcel":
        return salParcelCountries;
      default:
        return airMailCountries;
    }
  };

  // Filter countries based on search
  const filteredCountries = getCurrentCountries().filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle country selection
  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
  };

  // Handle back from details view
  const handleBack = () => {
    if (selectedCountry) {
      setSelectedCountry(null);
    } else {
      router.back();
    }
  };

  // Render EMS specific details
  const renderEMSDetails = (country: any) => {
    return (
      <View style={styles.ratesCard}>
        <Text style={styles.sectionTitle}>EMS Speed Post Rates</Text>
        
        {/* Base Rate */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Base Rate</Text>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Starting Rate</Text>
            <Text style={styles.rateText}>{country.rates.baseRate}</Text>
          </View>
        </View>

        {/* Weight Based Rates */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Weight Based Rates</Text>
          {country.rates.weightRates.map((item: any, index: number) => (
            <View key={index} style={styles.rateRow}>
              <Text style={styles.weightText}>{item.weight}</Text>
              <Text style={styles.rateText}>{item.rate}</Text>
            </View>
          ))}
        </View>

        {/* Additional Services */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Additional Services</Text>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Insurance</Text>
            <Text style={styles.rateText}>{country.rates.insurance}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Tracking</Text>
            <Text style={styles.rateText}>{country.rates.tracking}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Signature</Text>
            <Text style={styles.rateText}>{country.rates.signature}</Text>
          </View>
        </View>

        {/* Service Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Delivery Time: {country.rates.deliveryTime}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="fitness-center" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Maximum Weight: {country.rates.maxWeight}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-shipping" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Service: Express Mail Service
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Render Air Mail details
  const renderAirMailDetails = (country: any) => {
    return (
      <View style={styles.ratesCard}>
        <Text style={styles.sectionTitle}>Postal Rates</Text>
        
        {/* Letters Rates */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Letters & Documents</Text>
          {country.rates.letters.map((item: any, index: number) => (
            <View key={index} style={styles.rateRow}>
              <Text style={styles.weightText}>{item.weight}</Text>
              <Text style={styles.rateText}>{item.rate}</Text>
            </View>
          ))}
        </View>

        {/* Additional Charges */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Additional Charges</Text>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Registration Fee</Text>
            <Text style={styles.rateText}>{country.rates.registration}</Text>
          </View>
        </View>

        {/* Service Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Delivery Time: {country.rates.deliveryTime}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="fitness-center" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Maximum Weight: {country.rates.maxWeight}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Render SAL Parcel details
  const renderSALParcelDetails = (country: any) => {
    return (
      <View style={styles.ratesCard}>
        <Text style={styles.sectionTitle}>SAL Parcel Rates</Text>
        
        {/* Service Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            {country.rates.description}
          </Text>
        </View>

        {/* Weight Based Rates */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Weight Based Rates</Text>
          {country.rates.weightRates.map((item: any, index: number) => (
            <View key={index} style={styles.rateRow}>
              <Text style={styles.weightText}>{item.weight}</Text>
              <Text style={styles.rateText}>{item.rate}</Text>
            </View>
          ))}
        </View>

        {/* Additional Services */}
        <View style={styles.rateSection}>
          <Text style={styles.rateSectionTitle}>Additional Services</Text>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Insurance</Text>
            <Text style={styles.rateText}>{country.rates.insurance}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Tracking</Text>
            <Text style={styles.rateText}>{country.rates.tracking}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.weightText}>Signature</Text>
            <Text style={styles.rateText}>{country.rates.signature}</Text>
          </View>
        </View>

        {/* Service Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.rateSectionTitle}>Service Features</Text>
          {country.rates.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Service Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Delivery Time: {country.rates.deliveryTime}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="fitness-center" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Maximum Weight: {country.rates.maxWeight}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-shipping" size={20} color="#6c757d" />
            <Text style={styles.infoText}>
              Service: Surface Air Lifted (SAL)
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Country Details View
  if (selectedCountry) {
    return (
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={26} color="#ffffffff" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>{selectedCountry.name} - Rates</Text>
          <MaterialIcons name="more-vert" size={28} color="#fefeffff" />
        </View>

        <ScrollView contentContainerStyle={styles.detailsContainer}>
          {/* Country Header */}
          <View style={styles.countryHeader}>
            <Image source={{ uri: selectedCountry.flag }} style={styles.countryFlagLarge} />
            <Text style={styles.countryNameLarge}>{selectedCountry.name}</Text>
          </View>

          {/* Service Type */}
          <View style={[
            styles.serviceType,
            activeTab === "EMS (Speed Post)" ? styles.emsServiceType : 
            activeTab === "SAL Parcel" ? styles.salServiceType : 
            styles.airMailServiceType
          ]}>
            <Text style={styles.serviceTypeText}>{activeTab}</Text>
          </View>

          {/* Rates Table - Different for each service type */}
          {activeTab === "EMS (Speed Post)" 
            ? renderEMSDetails(selectedCountry)
            : activeTab === "SAL Parcel"
            ? renderSALParcelDetails(selectedCountry)
            : renderAirMailDetails(selectedCountry)
          }

          {/* Important Notes */}
          <View style={styles.notesCard}>
            <Text style={styles.sectionTitle}>Important Notes</Text>
            <Text style={styles.noteText}>
              • Rates are subject to change without prior notice
            </Text>
            <Text style={styles.noteText}>
              • Additional charges may apply for special handling
            </Text>
            <Text style={styles.noteText}>
              • Delivery times are estimates and may vary
            </Text>
            {activeTab === "EMS (Speed Post)" && (
              <Text style={styles.noteText}>
                • EMS includes tracking and signature confirmation
              </Text>
            )}
            {activeTab === "SAL Parcel" && (
              <Text style={styles.noteText}>
                • SAL is a cost-effective option combining sea and air transport
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Main List View
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={26} color="#ffffffff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Postal Services & Rates</Text>
        <MaterialIcons name="more-vert" size={28} color="#fefeffff" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search service or country..."
          placeholderTextColor="#6c757d"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.tabsContainer}
      >
        {["Air Mail/Registered", "EMS (Speed Post)", "Air Parcel", "SAL Parcel"].map((tab, i) => (
          <TouchableOpacity 
            key={i} 
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Country List */}
      <ScrollView contentContainerStyle={styles.countriesContainer}>
        {filteredCountries.map((country, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardHeaderLeft}>
              <Image source={{ uri: country.flag }} style={styles.flag} />
              <Text style={styles.cardHeaderText}>{country.name}</Text>
            </View>
            <TouchableOpacity 
              style={styles.viewRatesButton}
              onPress={() => handleCountrySelect(country)}
            >
              <Text style={styles.editText}>View Rates</Text>
              <MaterialIcons name="chevron-right" size={20} color="#D82828" />
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.updateText}>
          {activeTab === "EMS (Speed Post)" 
            ? "EMS Rates last updated on 01/08/2024" 
            : activeTab === "SAL Parcel"
            ? "SAL Parcel Rates last updated on 01/08/2024"
            : "Rates last updated on 01/08/2024"
          }
        </Text>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="calculate" size={24} color="#fff" />
        <Text style={styles.fabText}>Calculator</Text>
      </TouchableOpacity>
    </View>
  );
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 14,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#CED4DA",
    backgroundColor: "#D82828",
  },
  topBarTitle: { fontSize: 18, fontWeight: "700", color: "#fcfdffff"},
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CED4DA",
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#343A40",
    backgroundColor: "#fff",
  },
  tabsContainer: { paddingHorizontal: 16, marginBottom: 12 },
  tab: { 
    marginRight: 16, 
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#D82828",
  },
  tabText: {
    fontWeight: "700", 
    color: "#6c757d",
    fontSize: 14,
  },
  activeTabText: {
    color: "#1E2A3A",
  },
  countriesContainer: { paddingHorizontal: 16, paddingBottom: 120 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  flag: { width: 36, height: 36, borderRadius: 18 },
  cardHeaderText: { fontSize: 16, fontWeight: "500", color: "#343A40" },
  viewRatesButton: { flexDirection: "row", alignItems: "center" },
  editText: { fontSize: 14, fontWeight: "700", color: "#D82828", marginRight: 4 },
  updateText: { textAlign: "center", fontSize: 12, color: "#6c757d", marginTop: 16 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#D82828",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  // Details View Styles
  detailsContainer: { padding: 16, paddingBottom: 120 },
  countryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  countryFlagLarge: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  countryNameLarge: { fontSize: 20, fontWeight: "700", color: "#343A40" },
  serviceType: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  airMailServiceType: {
    backgroundColor: "#E8F5E8",
  },
  emsServiceType: {
    backgroundColor: "#E3F2FD",
  },
  salServiceType: {
    backgroundColor: "#FFF3E0",
  },
  serviceTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
  },
  ratesCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#343A40",
    marginBottom: 16,
  },
  descriptionSection: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
    fontStyle: 'italic',
  },
  rateSection: {
    marginBottom: 20,
  },
  rateSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 12,
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  weightText: {
    fontSize: 14,
    color: "#6c757d",
  },
  rateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D82828",
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 12,
  },
  notesCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  noteText: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default PostalRates;